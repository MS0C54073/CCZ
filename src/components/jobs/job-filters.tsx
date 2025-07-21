import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { jobFilters } from "@/lib/data";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function JobFilters() {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filter Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="keywords" placeholder="Job title, company..." className="pl-10" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Province</Label>
           <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a province" />
              </SelectTrigger>
              <SelectContent>
                {jobFilters.provinces.map((province) => (
                    <SelectItem key={province} value={province.toLowerCase()}>{province}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">City / District</Label>
          <Input id="location" placeholder="e.g. Lusaka, Ndola, Kitwe" />
        </div>
        <div className="space-y-4">
          <Label>Salary Range (ZMW)</Label>
          <Slider
            defaultValue={[5000, 25000]}
            max={50000}
            step={1000}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>ZMW 5k</span>
            <span>ZMW 25k</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Job Type</Label>
          <div className="space-y-2 pt-2">
            {jobFilters.jobType.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type.toLowerCase()} />
                <Label htmlFor={type.toLowerCase()} className="font-normal">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
