
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ApplyPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to the specific job page if not logged in.
      // The login prompt will be handled there.
      router.push(`/jobs/${params.id}`);
    }
  }, [user, loading, router, params.id]);

  if (loading || !user) {
    // You can add a loading spinner here
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
            <CheckCircle className="mx-auto h-12 w-12 text-green-500"/>
          <CardTitle className="text-2xl font-bold mt-4">Application Submitted!</CardTitle>
          <CardDescription>
            This is a placeholder page. Your application for job #{params.id} has been successfully submitted.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-center text-muted-foreground">
            In a real application, you would fill out a form here using your profile data.
          </p>
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
