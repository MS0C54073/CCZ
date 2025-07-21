
'use client';

import { useState } from 'react';
import { JobFilters } from "@/components/jobs/job-filters";
import { JobCard } from "@/components/jobs/job-card";
import { jobs } from "@/lib/data";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function JobsPage() {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000]);
  const [keyword, setKeyword] = useState('');

  const filteredJobs = jobs.filter(job => {
    // Salary filtering
    const salaryString = job.salary.replace(/ZMW|,|\s/g, '').split('-')[0];
    const jobSalary = parseInt(salaryString, 10);
    const salaryMatch = isNaN(jobSalary) || (jobSalary >= salaryRange[0] && jobSalary <= salaryRange[1]);

    // Keyword filtering
    const keywordMatch = keyword.trim() === '' ||
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      job.company.toLowerCase().includes(keyword.toLowerCase()) ||
      job.description.toLowerCase().includes(keyword.toLowerCase());

    return salaryMatch && keywordMatch;
  });


  return (
    <div className="bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <JobFilters
              keyword={keyword}
              onKeywordChange={setKeyword}
              salaryRange={salaryRange}
              onSalaryRangeChange={setSalaryRange}
            />
          </aside>
          <main className="md:col-span-3">
            <h1 className="text-3xl font-bold mb-6 font-headline">
              Showing {filteredJobs.length} Jobs
            </h1>
            <div className="space-y-6">
              {filteredJobs.map((job) => (
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
