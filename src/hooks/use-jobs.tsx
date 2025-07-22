
'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { jobs as initialJobs } from '@/lib/data';

type Job = (typeof initialJobs)[0];

interface JobsContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const addJob = (job: Job) => {
    setJobs(prevJobs => [job, ...prevJobs]);
  };

  const value = {
    jobs,
    addJob,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
}
