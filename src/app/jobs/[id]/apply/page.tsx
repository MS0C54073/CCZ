
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useNotifications } from '@/hooks/use-notifications';
import { useJobs } from '@/hooks/use-jobs';

export default function ApplyPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { jobs } = useJobs();
  const job = jobs.find(j => j.id === params.id);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/jobs/${params.id}`);
    }
  }, [user, loading, router, params.id]);

  useEffect(() => {
    // This effect runs once when the component mounts after a successful login.
    // In a real app, this would happen after a successful application API call.
    if (user && job) {
      addNotification({
        id: Math.random().toString(36).substring(2, 9),
        message: `Your application for the position of "${job.title}" at ${job.company} has been successfully submitted. We will notify you of any updates.`,
        date: new Date().toISOString(),
        read: false,
        type: 'application',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, job]); // Depends on user and job being loaded

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
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
           <Link href={`/jobs/${params.id}`} className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Job Details
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
