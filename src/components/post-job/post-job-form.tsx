
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { suggestSkillTags } from "@/ai/flows/skill-tagging";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { jobFilters } from "@/lib/data";
import { Slider } from "../ui/slider";

const postJobSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters."),
  company: z.string().min(2, "Company name is required."),
  logo: z.any().optional(),
  province: z.string().min(2, "Province is required."),
  city: z.string().min(2, "City/District is required."),
  salaryRange: z.array(z.number()).min(2).max(2),
  description: z.string().min(50, "Description must be at least 50 characters."),
  tasks: z.string().min(20, "Please list at least one task."),
  taskExamples: z.string().min(20, "Please provide at least one example."),
  whoWeAreLookingFor: z.string().min(20, "Please describe who you are looking for."),
  willBeAPlus: z.string().min(10, "Please list at least one 'plus' item."),
  whatWeOffer: z.string().min(20, "Please list at least one offering."),
  skills: z.array(z.string()),
});

type PostJobFormValues = z.infer<typeof postJobSchema>;

export function PostJobForm() {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const form = useForm<PostJobFormValues>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      skills: [],
      salaryRange: [5000, 25000],
    },
    mode: "onChange",
  });
  
  const jobDescription = form.watch("description");
  const salaryRange = form.watch("salaryRange");

  const handleSuggestSkills = async () => {
    if (!jobDescription || jobDescription.length < 50) {
      toast({
        variant: "destructive",
        title: "Description too short",
        description: "Please enter a job description of at least 50 characters.",
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await suggestSkillTags({ jobDescription });
      const currentSkills = form.getValues('skills');
      const newSkills = Array.from(new Set([...currentSkills, ...result.suggestedSkills]));
      form.setValue('skills', newSkills, { shouldValidate: true });
      toast({
        title: "Skills Suggested!",
        description: "AI has suggested skills based on your description.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to suggest skills. Please try again.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  function onSubmit(data: PostJobFormValues) {
    console.log(data);
    toast({
      title: "Job Posted!",
      description: "Your job listing is now live.",
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="e.g., Secondary School Teacher" {...field} /></FormControl><FormMessage /></FormItem> )} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="company" render={({ field }) => ( <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="e.g., Ministry of Education" {...field} /></FormControl><FormMessage /></FormItem> )} />
               <FormField control={form.control} name="logo" render={({ field }) => ( 
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="province" render={({ field }) => ( 
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobFilters.provinces.map((province) => (
                          <SelectItem key={province} value={province.toLowerCase()}>{province}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem> 
              )} />
              <FormField control={form.control} name="city" render={({ field }) => ( <FormItem><FormLabel>City/District</FormLabel><FormControl><Input placeholder="e.g., Lusaka" {...field} /></FormControl><FormMessage /></FormItem> )} />
            </div>
            
            <FormField
              control={form.control}
              name="salaryRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range (ZMW)</FormLabel>
                  <FormControl>
                    <Slider
                      value={field.value}
                      onValueChange={field.onChange}
                      max={100000}
                      step={1000}
                    />
                  </FormControl>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>ZMW {salaryRange[0].toLocaleString()}</span>
                    <span>ZMW {salaryRange[1].toLocaleString()}</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the role, responsibilities, and qualifications..." rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField control={form.control} name="tasks" render={({ field }) => (
              <FormItem>
                <FormLabel>Tasks</FormLabel>
                <FormControl><Textarea placeholder="List the main tasks for the role. One per line." rows={4} {...field} /></FormControl>
                <FormDescription>Enter each task on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="taskExamples" render={({ field }) => (
              <FormItem>
                <FormLabel>Examples of Tasks</FormLabel>
                <FormControl><Textarea placeholder="List specific examples of tasks. One per line." rows={4} {...field} /></FormControl>
                 <FormDescription>Enter each example on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="whoWeAreLookingFor" render={({ field }) => (
              <FormItem>
                <FormLabel>Who We Are Looking For</FormLabel>
                <FormControl><Textarea placeholder="Describe the ideal candidate's qualifications and attributes. One per line." rows={4} {...field} /></FormControl>
                 <FormDescription>Enter each requirement on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="willBeAPlus" render={({ field }) => (
              <FormItem>
                <FormLabel>It Will Be a Plus</FormLabel>
                <FormControl><Textarea placeholder="List desirable, but not essential, qualifications. One per line." rows={3} {...field} /></FormControl>
                 <FormDescription>Enter each item on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="whatWeOffer" render={({ field }) => (
              <FormItem>
                <FormLabel>What We Offer</FormLabel>
                <FormControl><Textarea placeholder="List the benefits and opportunities you provide. One per line." rows={4} {...field} /></FormControl>
                 <FormDescription>Enter each offering on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormItem>
              <div className="flex justify-between items-center mb-2">
                <FormLabel>Skills</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={handleSuggestSkills} disabled={isSuggesting || (jobDescription?.length ?? 0) < 50}>
                  {isSuggesting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Suggest with AI
                </Button>
              </div>
              <FormControl>
                 <div className="p-4 border rounded-md min-h-[4rem] flex flex-wrap gap-2">
                  {form.watch('skills').map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </FormControl>
              <FormDescription>
                Add skills relevant to this job posting. Use the AI suggestion tool for help.
              </FormDescription>
              <FormMessage />
            </FormItem>
            <div className="flex justify-end">
              <Button type="submit">Post Job</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
