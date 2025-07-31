
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Loader2, Wand2 } from 'lucide-react';
import { useNotifications } from '@/hooks/use-notifications';
import { useJobs } from '@/hooks/use-jobs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateCoverLetter } from '@/ai/flows/generate-cover-letter';
import { profileSchema as ProfileSchema, type ProfileFormValues } from '@/components/profile/profile-form';

// Mock user profile data. In a real app, this would be fetched from a database.
const userProfile: ProfileFormValues = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+260977123456",
  address: "123 Independence Avenue, Lusaka",
  nationalId: "123456/10/1",
  portfolio: "https://github.com/johndoe",
  experience: [{ title: 'Senior Software Engineer', company: 'Tech Solutions Ltd', years: '2020 - Present', description: 'Developing and maintaining web applications using modern technologies.' }],
  education: [{ degree: 'BSc in Computer Science', school: 'University of Zambia', year: '2020' }],
  certifications: [{name: 'Certified Kubernetes Administrator', issuingBody: 'The Linux Foundation', year: '2022', file: undefined}],
  skills: [{ value: 'React' }, { value: 'TypeScript' }, {value: 'Node.js'}, {value: 'Next.js'}, {value: 'Firebase'}],
  summary: 'A highly motivated and experienced software engineer with a passion for building scalable and user-friendly applications. Proficient in a wide range of technologies and always eager to learn new things.',
  driversLicense: { hasLicense: true, licenseDetails: 'Class C' },
};

export default function ApplyPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { jobs } = useJobs();
  const job = jobs.find(j => j.id === params.id);
  const { toast } = useToast();

  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/jobs/${params.id}`);
    }
  }, [user, loading, router, params.id]);

  const handleGenerateCoverLetter = async () => {
    if (!job || !userProfile) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not load job or profile data.' });
      return;
    }
    setIsGenerating(true);
    try {
      const userProfileString = `
        Summary: ${userProfile.summary}
        Experience: ${userProfile.experience.map(e => `${e.title} at ${e.company} (${e.years})`).join(', ')}
        Skills: ${userProfile.skills.map(s => s.value).join(', ')}
      `;
      const jobDetailsString = `
        Title: ${job.title}
        Company: ${job.company}
        Description: ${job.description}
      `;
      const result = await generateCoverLetter({
        userProfile: userProfileString,
        jobDetails: jobDetailsString,
      });
      setCoverLetter(result.coverLetter);
      toast({ title: 'Success', description: 'Cover letter generated!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate cover letter.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitApplication = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      if (job) {
        addNotification({
          id: Math.random().toString(36).substring(2, 9),
          message: `Your application for the position of "${job.title}" at ${job.company} has been successfully submitted. We will notify you of any updates.`,
          date: new Date().toISOString(),
          read: false,
          type: 'application',
        });
      }
      setApplicationSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };
  
  if (loading || !user || !job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (applicationSubmitted) {
     return (
      <div className="container mx-auto py-12 px-4 md:px-6 flex items-center justify-center min-h-[calc(100vh-150px)]">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
              <CheckCircle className="mx-auto h-12 w-12 text-primary"/>
            <CardTitle className="text-2xl font-bold mt-4">Application Submitted!</CardTitle>
            <CardDescription>
              You have successfully applied for the position. You will receive updates in the messages section.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
             <Link href={`/jobs`} className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Jobs
              </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center">
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <Link href={`/jobs/${params.id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Job Details
          </Link>
          <CardTitle className="text-3xl font-bold">Apply for {job.title}</CardTitle>
          <CardDescription>
            You are applying to <span className="font-semibold">{job.company}</span>. Review your details and submit your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="cover-letter" className="text-lg font-semibold">Cover Letter</Label>
                <div className="flex justify-end">
                     <Button variant="outline" size="sm" onClick={handleGenerateCoverLetter} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                        Generate with AI
                    </Button>
                </div>
                <Textarea 
                    id="cover-letter"
                    rows={15}
                    placeholder="Write your cover letter here, or use the AI generator to create a draft."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">You can edit the generated cover letter before submitting.</p>
            </div>
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button size="lg" onClick={handleSubmitApplication} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                Submit Application
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
