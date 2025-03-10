
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Download, Linkedin, Mail, Trash2, CheckCircle, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Applicant {
  id: number;
  name: string;
  position: string;
  description: string;
  date: string;
  resumeUrl: string;
  education: string;
  skills: string;
  email: string;
  linkedinProfile: string;
  whyJoinUs: string;
  availability: string;
  reviewed?: boolean;
}

interface ApplicantCardProps {
  applicant: Applicant;
  onDelete: (id: number) => void;
  onMarkReviewed: (id: number, reviewed: boolean) => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export function ApplicantCard({ applicant, onDelete, onMarkReviewed }: ApplicantCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteAlertOpen(false);
    onDelete(applicant.id);
  };

  const handleMarkReviewed = () => {
    onMarkReviewed(applicant.id, !applicant.reviewed);
  };

  return (
    <>
      <div className="bg-[#947dc2]/10 p-4 rounded-md border border-[#947dc2]/20 relative">
        <div className="absolute top-3 right-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-gray-500 hover:text-red-500 hover:bg-transparent"
            onClick={() => setIsDeleteAlertOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-[#947dc2]">
              <AvatarFallback className="text-black dark:text-white">
                {getInitials(applicant.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-[#947dc2]">{applicant.name}</h3>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                {applicant.linkedinProfile ? (
                  <a
                    href={applicant.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-[#947dc2] transition-colors"
                  >
                    <Linkedin className="h-3 w-3" />
                    LinkedIn Profile
                  </a>
                ) : (
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {applicant.email}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm mt-3">{truncateText(applicant.description, 100)}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{applicant.date}</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`${applicant.reviewed ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-[#947dc2]/20 text-[#947dc2] hover:bg-[#947dc2]/30"}`}
              onClick={handleMarkReviewed}
            >
              {applicant.reviewed ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" /> Pending
                </>
              ) : (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" /> Review
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setIsDetailsOpen(true)}
            >
              View Details
            </Button>
          </div>
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

          <ScrollArea className="h-[70vh] pr-4">
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16 bg-[#947dc2]">
                  <AvatarFallback className="text-black dark:text-white text-xl">
                    {getInitials(applicant.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{applicant.name}</h2>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Contact:</span>
                    <span className="text-sm">{applicant.email}</span>
                    {applicant.linkedinProfile && (
                      <a
                        href={applicant.linkedinProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <Linkedin className="h-3 w-3" /> LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Education</h3>
                    <p className="text-sm">{applicant.education}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <p className="text-sm">{applicant.skills}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Why join us?</h3>
                    <p className="text-sm">{applicant.whyJoinUs || "Not specified"}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Availability</h3>
                    <p className="text-sm">{applicant.availability || "Not specified"}</p>
                  </CardContent>
                </Card>

                <div className="flex justify-between items-center gap-5">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`w-auto flex-1 ${applicant.reviewed ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-[#947dc2]/20 text-[#947dc2] hover:bg-[#947dc2]/30"}`}
                    onClick={handleMarkReviewed}
                  >
                    {applicant.reviewed ? (
                      <>
                        <ArrowLeft className="h-4 w-4 mr-1" /> Mark as Pending
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" /> Mark Reviewed
                      </>
                    )}
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-auto flex-1 bg-[#947dc2] hover:bg-[#947dc2]/90"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the application from {applicant.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="h-9">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="h-9 bg-red-500 hover:bg-red-600 focus:ring-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
