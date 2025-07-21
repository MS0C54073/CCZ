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

const postJobSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters."),
  company: z.string().min(2, "Company name is required."),
  location: z.string().min(2, "Location is required."),
  salaryMin: z.coerce.number().min(0),
  salaryMax: z.coerce.number().min(0),
  description: z.string().min(50, "Description must be at least 50 characters."),
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
    },
    mode: "onChange",
  });
  
  const jobDescription = form.watch("description");

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
      form.setValue('skills', result.suggestedSkills);
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
            <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="e.g., Senior Software Engineer" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="company" render={({ field }) => ( <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="e.g., Innovatech" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="location" render={({ field }) => ( <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., San Francisco, CA or Remote" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="salaryMin" render={({ field }) => ( <FormItem><FormLabel>Minimum Salary</FormLabel><FormControl><Input type="number" placeholder="e.g., 120000" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="salaryMax" render={({ field }) => ( <FormItem><FormLabel>Maximum Salary</FormLabel><FormControl><Input type="number" placeholder="e.g., 150000" {...field} /></FormControl><FormMessage /></FormItem> )} />
            </div>
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
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Skills</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={handleSuggestSkills} disabled={isSuggesting || !jobDescription}>
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
