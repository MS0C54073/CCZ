
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Briefcase, Building, MapPin, UserPlus, FileText, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <main className="flex-1">
        <HeroSection />
        <NewJobsSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
    </div>
  );
}

function HeroSection() {
  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    if (query) {
      router.push(`/jobs?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/jobs');
    }
  };
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Connecting Zambia's Talent with Opportunity
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Career Compass connects you with your next great career opportunity. Explore thousands of jobs and find the one that's right for you.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form onSubmit={handleSearch} className="flex space-x-2">
                <Input
                  type="text"
                  name="query"
                  placeholder="Job title, keyword, or company"
                  className="max-w-lg flex-1"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
            </div>
          </div>
          <Image
            src="https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf"
            width="600"
            height="400"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
}

function NewJobsSection() {
  const newJobs = [
    { title: 'Secondary School Teacher', company: 'Ministry of Education', location: 'Lusaka, Lusaka' },
    { title: 'Registered Nurse', company: 'Ndola Central Hospital', location: 'Ndola, Copperbelt' },
    { title: 'Mining Engineer', company: 'First Quantum Minerals (FQM)', location: 'Solwezi, North-Western' },
    { title: 'Project Manager (NGO)', company: 'WWF Zambia', location: 'Mongu, Western' },
    { title: 'ICT Officer', company: 'Zambia Revenue Authority', location: 'Kitwe, Copperbelt'},
    { title: 'Construction Foreman', company: 'Zhong-Gan Engineering', location: 'Lusaka, Lusaka'},
    { title: 'Accountant', company: 'Airtel Zambia', location: 'Lusaka, (Hybrid)'},
    { title: 'Agronomist', company: 'Zambeef Products PLC', location: 'Chisamba, Central'},
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 font-headline">New Jobs</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {newJobs.map((job, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-primary" /> {job.title}
                  </div>
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 pt-2">
                    <Building className="w-4 h-4" /> {job.company}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {job.location}
                </div>
                <Button asChild className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/jobs">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: UserPlus, title: 'Create Account', description: 'Sign up as a job seeker or an employer to get started.' },
    { icon: FileText, title: 'Build Your Profile/Post Job', description: 'Create a stunning profile or post a job listing with our easy-to-use tools.' },
    { icon: CheckCircle, title: 'Apply & Get Hired', description: 'Apply for jobs that match your skills and get hired by top companies.' },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 font-headline">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <step.icon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to take the next step?</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Whether you're looking for your dream job or the perfect candidate, Career Compass is here to help.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/jobs">Find a Job</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/post-job">Post a Job</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
