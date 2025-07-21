import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeekerDashboard } from "@/components/dashboard/seeker-dashboard";
import { RecruiterDashboard } from "@/components/dashboard/recruiter-dashboard";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 font-headline">Dashboard</h1>
      <Tabs defaultValue="seeker" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="seeker">Job Seeker</TabsTrigger>
          <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
        </TabsList>
        <TabsContent value="seeker">
          <SeekerDashboard />
        </TabsContent>
        <TabsContent value="recruiter">
          <RecruiterDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
