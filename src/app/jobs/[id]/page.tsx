
'use client';

import { jobs } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Briefcase, CalendarDays, CheckCircle, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { LoginDialog } from "@/components/layout/login-dialog";

type JobDetailPageProps = {
  params: {
    id: string;
  };
};

function Section({ title, items }: { title: string; items: string[] }) {
    if (!items || items.length === 0) return null;
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold font-headline">{title}</h2>
        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = jobs.find((j) => j.id === params.id);
  const { user } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  if (!job) {
    notFound();
  }
  
  const handleApplyClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIsLoginDialogOpen(true);
    }
  };

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto py-8 px-4 md:px-6">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <main className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                 <Image
                      src={job.logo}
                      data-ai-hint="company logo"
                      width={80}
                      height={80}
                      alt={`${job.company} logo`}
                      className="rounded-lg border"
                  />
                  <div>
                      <h1 className="text-3xl font-bold font-headline">{job.title}</h1>
                      <p className="text-muted-foreground text-lg">{job.company}</p>
                  </div>
              </div>
              <div className="space-y-8">
                  <Section title="Tasks" items={job.details.tasks} />
                  <Section title="Examples of tasks" items={job.details.taskExamples} />
                  <Section title="Who we are looking for" items={job.details.whoWeAreLookingFor} />
                  <Section title="It will be a plus" items={job.details.willBeAPlus} />
                  <Section title="What we offer" items={job.details.whatWeOffer} />
              </div>
            </main>
            <aside className="lg:col-span-1 space-y-6">
               <Card className="sticky top-20">
                  <CardHeader>
                      <CardTitle>Job Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                          <Briefcase className="w-5 h-5 text-primary" />
                          <div>
                              <p className="font-semibold">Job Type</p>
                              <p className="text-muted-foreground">{job.type}</p>
                          </div>
                      </div>
                       <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                              <p className="font-semibold">Location</p>
                              <p className="text-muted-foreground">{job.location}</p>
                          </div>
                      </div>
                       <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <div>
                              <p className="font-semibold">Salary</p>
                              <p className="text-muted-foreground">{job.salary}</p>
                          </div>
                      </div>
                       <div className="flex items-center gap-3">
                          <CalendarDays className="w-5 h-5 text-primary" />
                          <div>
                              <p className="font-semibold">Posted</p>
                              <p className="text-muted-foreground">{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</p>
                          </div>
                      </div>
                      <div className="pt-4">
                          <h4 className="font-semibold mb-2">Skills Required</h4>
                          <div className="flex flex-wrap gap-2">
                              {job.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                          </div>
                      </div>
                      <Button asChild size="lg" className="w-full mt-4">
                        <Link href={`/jobs/${job.id}/apply`} onClick={handleApplyClick}>Apply Now</Link>
                      </Button>
                  </CardContent>
               </Card>
            </aside>
          </div>
        </div>
      </div>
      <LoginDialog isOpen={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
    </>
  );
}
