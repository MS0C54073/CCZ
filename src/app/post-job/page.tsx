
'use client';

import { Suspense } from 'react';
import PostJobFormLazy from '@/components/post-job/post-job-form-lazy';
import { Skeleton } from '@/components/ui/skeleton';

function PostJobPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

export default function PostJobPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6 max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline">Post a New Job</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the details below to find your next great hire.
          </p>
        </header>
        <Suspense fallback={<PostJobPageSkeleton />}>
          <PostJobFormLazy />
        </Suspense>
      </div>
    </div>
  );
}
