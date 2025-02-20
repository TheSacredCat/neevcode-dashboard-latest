
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

export function TeacherList() {
const teachers = [
    {
      name: "Dr. Pallavi Kamra",
      subject: "Teacher Training & Student Counseling",
      status: "Active",
      email: "dr.pallavi.k@neevcode.com",
    },
    {
      name: "Savyasaachi V.",
      subject: "Advanced Python",
      status: "Active",
      email: "savyasaachi.v@neevcode.com",
    },
    {
      name: "Shine RIjie",
      subject: "UI/UX Design",
      status: "Active",
      email: "shine.r@neevcode.com",
    },
    {
      name: "Ashish Jaisawl",
      subject: "Networking",
      status: "Active",
      email: "ashish.j@neevcode.com",
    },
  ];

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {teachers.map((teacher, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-card rounded-lg border">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10" />
              <div>
                <p className="text-sm font-medium">{teacher.name}</p>
                <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                <p className="text-xs text-muted-foreground">{teacher.email}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Teacher</DropdownMenuItem>
                <DropdownMenuItem>View Schedule</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Remove Teacher
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
