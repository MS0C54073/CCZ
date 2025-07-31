
'use client';

import { useState, useMemo, useEffect } from 'react';
import { JobFilters } from "@/components/jobs/job-filters";
import { JobCard } from "@/components/jobs/job-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useJobs } from '@/hooks/use-jobs';
import { Skeleton } from '@/components/ui/skeleton';

const initialSalaryRange: [number, number] = [0, 100000];

function JobCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg">
      <div className="flex items-start gap-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}


export default function JobsPage() {
  const { jobs } = useJobs();
  const [loading, setLoading] = useState(true);
  const [salaryRange, setSalaryRange] = useState<[number, number]>(initialSalaryRange);
  const [keyword, setKeyword] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [jobTypes, setJobTypes] = useState<string[]>([]);

  const filteredJobs = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return jobs
      .filter(job => new Date(job.postedDate) >= thirtyDaysAgo) 
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) 
      .filter(job => {
        const salaryString = job.salary.replace(/ZMW|,|\s/g, '').split('+')[0];
        const salaryMatchValue = parseInt(salaryString, 10);
        const salaryMatch = isNaN(salaryMatchValue) || (salaryMatchValue >= salaryRange[0] && salaryMatchValue <= salaryRange[1]);
        
        const keywordMatch = keyword.trim() === '' ||
          job.title.toLowerCase().includes(keyword.toLowerCase()) ||
          job.company.toLowerCase().includes(keyword.toLowerCase()) ||
          job.description.toLowerCase().includes(keyword.toLowerCase());
          
        const provinceMatch = province.trim() === '' || job.location.toLowerCase().includes(province.toLowerCase());
        const cityMatch = city.trim() === '' || job.location.toLowerCase().includes(city.toLowerCase());
        
        const jobTypeMatch = jobTypes.length === 0 || jobTypes.includes(job.type);

        return salaryMatch && keywordMatch && provinceMatch && cityMatch && jobTypeMatch;
      });
  }, [jobs, salaryRange, keyword, province, city, jobTypes]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, [salaryRange, keyword, province, city, jobTypes]);


  const resetFilters = () => {
    setKeyword('');
    setProvince('');
    setCity('');
    setSalaryRange(initialSalaryRange);
    setJobTypes([]);
  };


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
              province={province}
              onProvinceChange={setProvince}
              city={city}
              onCityChange={setCity}
              jobTypes={jobTypes}
              onJobTypesChange={setJobTypes}
              onReset={resetFilters}
            />
          </aside>
          <main className="md:col-span-3">
            <h1 className="text-3xl font-bold mb-6 font-headline">
              {loading ? 'Searching for jobs...' : `Showing ${filteredJobs.length} Jobs`}
            </h1>
            <div className="space-y-6">
              {loading ? (
                <>
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                </>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </div>
            {!loading && filteredJobs.length > 0 && (
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
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
