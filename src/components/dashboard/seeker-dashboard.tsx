
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink } from "lucide-react";
import { applications } from "@/lib/data";
import { useEffect, useState } from "react";
import Link from "next/link";

// Mock user profile data. In a real app, this would be fetched from a database.
const userProfile = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+260977123456",
  address: "123 Independence Avenue, Lusaka",
  nationalId: "", // Missing
  portfolio: "", // Missing
  experience: [
    { title: 'Software Engineer', company: 'Tech Solutions', years: '2', description: 'Developed stuff.' }
  ],
  education: [
    { degree: 'BSc Computer Science', school: 'University of Zambia', year: '2020' }
  ],
  skills: ["React", "TypeScript", "Node.js"],
  summary: "A skilled software engineer...",
  certifications: [], // Missing
  driversLicense: { hasLicense: true, licenseDetails: 'Class C' },
};


export function SeekerDashboard() {
  const [profileStrength, setProfileStrength] = useState({ percentage: 0, missingFields: [] as string[] });

  useEffect(() => {
    const calculateProfileStrength = () => {
      const fields = [
        { key: 'fullName', label: 'your full name' },
        { key: 'email', label: 'your email' },
        { key: 'phone', label: 'your phone number' },
        { key: 'address', label: 'your address' },
        { key: 'nationalId', label: 'your National ID' },
        { key: 'portfolio', label: 'your portfolio link' },
        { key: 'experience', label: 'at least one work experience' },
        { key: 'education', label: 'at least one education entry' },
        { key: 'skills', label: 'at least one skill' },
        { key: 'summary', label: 'your AI summary' },
        { key: 'certifications', label: 'any certifications' },
        { key: 'driversLicense', label: 'your driver\'s license details' },
      ];

      let completedFields = 0;
      const newMissingFields: string[] = [];
      
      fields.forEach(field => {
        const value = userProfile[field.key as keyof typeof userProfile];
        if (Array.isArray(value)) {
          if (value.length > 0) {
            completedFields++;
          } else {
             newMissingFields.push(`Add ${field.label}`);
          }
        } else if (typeof value === 'object' && value !== null) {
            if ((value as any).hasLicense) { // specific to driversLicense
                completedFields++;
            } else {
                newMissingFields.push(`Add ${field.label}`);
            }
        }
        else if (value) {
          completedFields++;
        } else {
          newMissingFields.push(`Add ${field.label}`);
        }
      });

      const percentage = Math.round((completedFields / fields.length) * 100);
      setProfileStrength({ percentage, missingFields: newMissingFields });
    };

    calculateProfileStrength();
  }, []);


  const savedJobs = [
    { id: '3', title: 'UX/UI Designer', company: 'Creative Studio', location: 'Remote' },
    { id: '4', title: 'Backend Engineer (Go)', company: 'ScaleFast', location: 'Austin, TX' },
  ];

  const statusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
    switch (status) {
      case 'Shortlisted':
        return 'default';
      case 'Viewed':
        return 'secondary';
      case 'Submitted':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="grid gap-6 mt-4 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track the status of your recent job applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Applied On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map(app => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.jobTitle}</TableCell>
                    <TableCell>{app.company}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={statusVariant(app.status)}>{app.status}</Badge>
                    </TableCell>
                    <TableCell>{app.appliedDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Bookmark className="mr-2 h-5 w-5"/> Saved Jobs</CardTitle>
            <CardDescription>Your bookmarked jobs for future applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedJobs.map(job => (
                <div key={job.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                  <div>
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company} - {job.location}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Profile Strength</CardTitle>
            <CardDescription>Complete your profile to attract more recruiters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Overall Completion</span>
              <span className="font-bold text-primary">{profileStrength.percentage}%</span>
            </div>
            <Progress value={profileStrength.percentage} />
            {profileStrength.percentage < 100 && (
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                {profileStrength.missingFields.slice(0, 3).map((field, index) => (
                    <li key={index}>{field}</li>
                ))}
              </ul>
            )}
            <Button asChild className="w-full">
              <Link href="/profile">Improve Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
