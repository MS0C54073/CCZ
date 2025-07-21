import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink } from "lucide-react";
import { applications } from "@/lib/data";

export function SeekerDashboard() {
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
              <span className="font-bold text-primary">75%</span>
            </div>
            <Progress value={75} />
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Add your portfolio link</li>
              <li>Add 2 more skills</li>
            </ul>
            <Button className="w-full">Improve Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
