import { PostJobForm } from "@/components/post-job/post-job-form";

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
        <PostJobForm />
      </div>
    </div>
  );
}
