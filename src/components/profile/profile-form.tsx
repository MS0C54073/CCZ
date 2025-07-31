
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, Wand2, Loader2, FileText, Edit, Download, Eye, UploadCloud } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useRef, useState } from 'react';
import { summarizeProfile } from '@/ai/flows/summarize-profile';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '../ui/checkbox';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeTemplate } from './resume-template';
import { parseCv } from '@/ai/flows/parse-cv';


export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  nationalId: z.string().optional(),
  portfolio: z.string().url().optional().or(z.literal('')),
  driversLicense: z.object({
    hasLicense: z.boolean().default(false),
    licenseDetails: z.string().optional(),
  }).optional(),
  experience: z.array(
    z.object({
      title: z.string().min(1, 'Title is required'),
      company: z.string().min(1, 'Company is required'),
      years: z.string().min(1, 'Years are required'),
      description: z.string().optional(),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string().min(1, 'Degree is required'),
      school: z.string().min(1, 'School is required'),
      year: z.string().min(4, 'Year is required'),
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string().min(1, 'Certification name is required'),
      issuingBody: z.string().min(1, 'Issuing body is required'),
      year: z.string().optional(),
      file: z.any().optional(),
    })
  ),
  skills: z.array(z.object({ value: z.string() })),
  summary: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultValues: ProfileFormValues = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+260 977 123 456',
  address: '123 Independence Avenue, Lusaka, Zambia',
  nationalId: '123456/10/1',
  portfolio: 'https://github.com/johndoe',
  experience: [{ title: 'Senior Software Engineer', company: 'Tech Solutions Ltd', years: '2020 - Present', description: 'Developing and maintaining web applications using modern technologies.' }],
  education: [{ degree: 'BSc in Computer Science', school: 'University of Zambia', year: '2020' }],
  certifications: [{name: 'Certified Kubernetes Administrator', issuingBody: 'The Linux Foundation', year: '2022', file: undefined}],
  skills: [{ value: 'React' }, { value: 'TypeScript' }, {value: 'Node.js'}, {value: 'Next.js'}, {value: 'Firebase'}],
  summary: 'A highly motivated and experienced software engineer with a passion for building scalable and user-friendly applications. Proficient in a wide range of technologies and always eager to learn new things.',
  driversLicense: { hasLicense: true, licenseDetails: 'Class C' },
};

// Mock data for resume versions
const resumeVersions = [
  { id: '1', name: 'Standard Tech CV', type: 'ICT' },
  { id: '2', name: 'NGO & Development Resume', type: 'NGO' },
  { id: '3', name: 'Management CV', type: 'Management' },
];

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: 'onChange',
  });
  
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isParsingCv, setIsParsingCv] = useState(false);

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control: form.control, name: 'experience' });
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control: form.control, name: 'education' });
  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control: form.control, name: 'certifications' });
    
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsSummarizing(true);
    const formData = form.getValues();
    const profileText = `
      Experience: ${formData.experience.map(e => `${e.title} at ${e.company} for ${e.years}`).join(', ')}.
      Education: ${formData.education.map(e => `${e.degree} from ${e.school}`).join(', ')}.
      Skills: ${formData.skills.map(s => s.value).join(', ')}.
    `;

    try {
      const result = await summarizeProfile({ profileText });
      form.setValue('summary', result.summary);
      toast({ title: 'Success', description: 'AI summary has been generated.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate summary.',
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleDownloadPdf = async () => {
    const resumeElement = resumeRef.current;
    if (!resumeElement) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not find the resume content to download.' });
        return;
    }

    setIsDownloading(true);

    try {
        const canvas = await html2canvas(resumeElement, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            logging: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const widthInPdf = pdfWidth;
        const heightInPdf = widthInPdf / ratio;
        
        // If the content is longer than one page, it will be scaled down.
        // A more complex implementation would split the content across multiple pages.
        if (heightInPdf > pdfHeight) {
            console.warn("Content is longer than a single PDF page. It will be scaled to fit.");
        }

        pdf.addImage(imgData, 'PNG', 0, 0, widthInPdf, heightInPdf);
        pdf.save(`${form.getValues('fullName').replace(' ', '_')}_CV.pdf`);
        toast({ title: 'Success', description: 'Your resume has been downloaded.' });
    } catch (error) {
        console.error("Error generating PDF:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate PDF. Check the console for details.' });
    } finally {
        setIsDownloading(false);
    }
  };

  const handleCvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsingCv(true);
    toast({ title: 'Parsing CV...', description: 'Please wait while we read your CV.' });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const cvDataUri = reader.result as string;
        try {
            const parsedData = await parseCv({ cvDataUri });
            
            // Merge existing data with parsed data, giving preference to parsed data
            const currentData = form.getValues();
            const newData = { ...currentData, ...parsedData };
            
            // To prevent errors, ensure arrays are not undefined
            newData.experience = parsedData.experience || currentData.experience;
            newData.education = parsedData.education || currentData.education;
            newData.skills = parsedData.skills || currentData.skills;
            newData.certifications = parsedData.certifications?.map(c => ({...c, file: undefined})) || currentData.certifications;

            form.reset(newData);
            
            toast({
                title: 'Success!',
                description: 'Your profile has been auto-filled from your CV.',
            });
        } catch (error) {
            console.error("CV Parsing Error:", error);
            toast({
                variant: 'destructive',
                title: 'Parsing Failed',
                description: 'We could not automatically read your CV. Please fill out the form manually.',
            });
        } finally {
            setIsParsingCv(false);
            // Reset file input
            event.target.value = '';
        }
    };
    reader.onerror = (error) => {
        console.error("File Reader Error:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not read the uploaded file.' });
        setIsParsingCv(false);
    };
  };

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: 'Profile Saved!',
      description: 'Your professional profile has been updated.',
    });
  }

  return (
    <>
    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
      <ResumeTemplate ref={resumeRef} profile={form.watch()} />
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
                <UploadCloud className="h-8 w-8 text-primary"/>
                <div>
                    <CardTitle>Auto-fill from CV</CardTitle>
                    <CardDescription>Upload your CV (PDF, DOCX) to automatically fill in your details.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
                <Input id="cv-upload" type="file" className="hidden" onChange={handleCvUpload} accept=".pdf,.doc,.docx" disabled={isParsingCv}/>
                <Button asChild variant="outline" className="w-full cursor-pointer" disabled={isParsingCv}>
                    <label htmlFor="cv-upload">
                        {isParsingCv ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <UploadCloud className="mr-2 h-4 w-4"/>}
                        {isParsingCv ? 'Parsing...' : 'Upload CV & Auto-fill'}
                    </label>
                </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>This information will be used to populate your applications.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input placeholder="+260 977 123456" {...field} /></FormControl>
                </FormItem>
              )}
            />
            <FormField control={form.control} name="nationalId" render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID (NRC/Passport)</FormLabel>
                  <FormControl><Input placeholder="e.g. 123456/10/1" {...field} /></FormControl>
                </FormItem>
              )}
            />
            <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl><Textarea placeholder="Your physical address" {...field} /></FormControl>
                </FormItem>
              )}
            />
            <FormField control={form.control} name="portfolio" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Portfolio/Website</FormLabel>
                  <FormControl><Input placeholder="https://your-portfolio.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>AI Summary</CardTitle>
                <CardDescription>Generate a professional summary with AI.</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={handleGenerateSummary} disabled={isSummarizing}>
                {isSummarizing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <FormField control={form.control} name="summary" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="A professional summary will be generated here..." rows={5} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="space-y-1.5">
                      <CardTitle>My Resume Versions</CardTitle>
                      <CardDescription>Create and manage CVs tailored for different job types.</CardDescription>
                    </div>
                    <Button type="button" variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Resume
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {resumeVersions.map(resume => (
                    <div key={resume.id} className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                            <FileText className="h-6 w-6 text-primary" />
                            <div>
                                <p className="font-semibold">{resume.name}</p>
                                <div className="text-sm text-muted-foreground">Type: {resume.type}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handleDownloadPdf} disabled={isDownloading}>
                                <Eye className="mr-2 h-4 w-4" />
                                Open
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleDownloadPdf} disabled={isDownloading}>
                                {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                                Download PDF
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Detail your professional history.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {expFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name={`experience.${index}.title`} render={({ field }) => ( <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} placeholder="Software Engineer" /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => ( <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} placeholder="Tech Solutions Inc." /></FormControl><FormMessage /></FormItem> )} />
                </div>
                <FormField control={form.control} name={`experience.${index}.years`} render={({ field }) => ( <FormItem><FormLabel>Dates</FormLabel><FormControl><Input {...field} placeholder="2020 - Present" /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name={`experience.${index}.description`} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="Describe your responsibilities and achievements." /></FormControl></FormItem> )} />
                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendExp({ title: '', company: '', years: '', description: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>List your academic qualifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {eduFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => ( <FormItem><FormLabel>Degree/Diploma</FormLabel><FormControl><Input {...field} placeholder="e.g., Bachelor of Science" /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name={`education.${index}.school`} render={({ field }) => ( <FormItem><FormLabel>School/University</FormLabel><FormControl><Input {...field} placeholder="e.g., University of Zambia" /></FormControl><FormMessage /></FormItem> )} />
                </div>
                 <FormField control={form.control} name={`education.${index}.year`} render={({ field }) => ( <FormItem><FormLabel>Year of Graduation</FormLabel><FormControl><Input {...field} placeholder="e.g., 2024" /></FormControl><FormMessage /></FormItem> )} />
                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendEdu({ degree: '', school: '', year: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
            <CardDescription>Add any professional certifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {certFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name={`certifications.${index}.name`} render={({ field }) => ( <FormItem><FormLabel>Certification Name</FormLabel><FormControl><Input {...field} placeholder="e.g., Google Certified Cloud Architect" /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name={`certifications.${index}.issuingBody`} render={({ field }) => ( <FormItem><FormLabel>Issuing Body</FormLabel><FormControl><Input {...field} placeholder="e.g., Google" /></FormControl><FormMessage /></FormItem> )} />
                </div>
                 <FormField control={form.control} name={`certifications.${index}.year`} render={({ field }) => ( <FormItem><FormLabel>Year Obtained</FormLabel><FormControl><Input {...field} placeholder="e.g., 2023" /></FormControl><FormMessage /></FormItem> )} />
                 <FormField control={form.control} name={`certifications.${index}.file`} render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Certificate File</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeCert(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendCert({ name: '', issuingBody: '', year: '', file: undefined })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>List your technical and professional skills.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simple display for now. Could be improved with a tag-input component. */}
            <div className="flex flex-wrap gap-2">
              {form.watch('skills').map((skill, index) => (
                <Badge key={index} variant="default">{skill.value}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Driver's License</CardTitle>
            <CardDescription>Specify if you have a driver's license.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="driversLicense.hasLicense"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I have a driver's license
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            {form.watch('driversLicense.hasLicense') && (
              <FormField
                control={form.control}
                name="driversLicense.licenseDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Class/Details</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Class C" />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save Profile</Button>
        </div>
      </form>
    </Form>
    </>
  );
}
