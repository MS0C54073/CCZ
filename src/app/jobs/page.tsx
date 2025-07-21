import { JobFilters } from "@/components/jobs/job-filters";
import { JobCard } from "@/components/jobs/job-card";
import { jobs } from "@/lib/data";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function JobsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <JobFilters />
          </aside>
          <main className="md:col-span-3">
            <h1 className="text-3xl font-bold mb-6 font-headline">
              Showing {jobs.length} Jobs
            </h1>
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </main>
        </div>
      </div>
    </div>
  );
}
