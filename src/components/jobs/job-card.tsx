import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Building, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  tags: string[];
};

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Image
            src={job.logo}
            data-ai-hint="company logo"
            width={64}
            height={64}
            alt={`${job.company} logo`}
            className="rounded-lg border"
          />
          <div className="flex-1">
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Building className="h-4 w-4" /> {job.company}
            </CardDescription>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{job.type}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button asChild variant="secondary">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
        <Button asChild>
          <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
