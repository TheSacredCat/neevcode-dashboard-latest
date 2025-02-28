
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Applicant {
  id: number;
  name: string;
  position: string;
  description: string;
  date: string;
  resumeUrl: string;
  education: string;
  experience: string;
  skills: string;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export function ApplicantCard({ applicant }: { applicant: Applicant }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <div className="bg-[#947dc2]/10 p-4 rounded-md border border-[#947dc2]/20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-[#947dc2]">
              <AvatarFallback className="text-black dark:text-white">
                {getInitials(applicant.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-[#947dc2]">{applicant.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Applied for: {applicant.position}</p>
            </div>
          </div>
        </div>
        <p className="text-sm mt-3">{applicant.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{applicant.date}</span>
          <Button variant="outline" size="sm" onClick={() => setIsDetailsOpen(true)}>
            View Details
          </Button>
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Applicant Details</DialogTitle>
            <DialogDescription>
              Detailed information about the applicant
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16 bg-[#947dc2]">
                <AvatarFallback className="text-black dark:text-white text-xl">
                  {getInitials(applicant.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{applicant.name}</h2>
                <p className="text-[#947dc2]">{applicant.position}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p className="text-sm">{applicant.education}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Experience</h3>
                  <p className="text-sm">{applicant.experience}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <p className="text-sm">{applicant.skills}</p>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
