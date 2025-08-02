
'use client';

import { useState, useMemo, useEffect } from 'react';
import { JobFilters } from "@/components/jobs/job-filters";
import { JobCard } from "@/components/jobs/job-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { useJobs } from '@/hooks/use-jobs';
import { Skeleton } from '@/components/ui/skeleton';
import { FileSearch } from 'lucide-react';

const JOBS_PER_PAGE = 5;
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
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return jobs
      .filter(job => new Date(job.postedDate) >= thirtyDaysAgo)
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
      .filter(job => {
        const salaryString = job.salary.replace(/ZMW|,|\s/g, '').split('-')[0];
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
    setCurrentPage(1); // Reset to first page on new filter
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

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} />
          </PaginationItem>
          {pageNumbers.map((num, index) => (
            <PaginationItem key={index}>
              {typeof num === 'number' ? (
                <PaginationLink href="#" isActive={currentPage === num} onClick={(e) => { e.preventDefault(); setCurrentPage(num); }}>
                  {num}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
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
                Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={i} />)
              ) : paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <FileSearch className="mx-auto h-12 w-12 mb-4"/>
                    <h3 className="text-xl font-semibold">No jobs found</h3>
                    <p>Try adjusting your search filters to find what you're looking for.</p>
                </div>
              )}
            </div>
            {!loading && renderPagination()}
          </main>
        </div>
      </div>
    </div>
  );
}
