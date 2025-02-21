
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export function TeacherList() {
  const teachers = [
    {
      name: "Dr. Pallavi Kamra",
      subject: "Teacher Training & Student Counseling",
      role: "Senior Teacher",
      status: "Active",
      email: "dr.pallavi.k@neevcode.com",
    },
    {
      name: "Savyasaachi V.",
      subject: "Advanced Python",
      role: "Lead Instructor",
      status: "Active",
      email: "savyasaachi.v@neevcode.com",
    },
    {
      name: "Shine RIjie",
      subject: "UI/UX Design",
      role: "Design Lead",
      status: "Active",
      email: "shine.r@neevcode.com",
    },
    {
      name: "Ashish Jaisawl",
      subject: "Networking",
      role: "Technical Instructor",
      status: "Active",
      email: "ashish.j@neevcode.com",
    },
  ];

  const handleEdit = (teacher: typeof teachers[0]) => {
    toast.info("Edit teacher", {
      description: `Editing ${teacher.name}`,
      duration: 2000,
    });
  };

  const handleDelete = (teacher: typeof teachers[0]) => {
    toast.error("Delete teacher", {
      description: `Deleting ${teacher.name}`,
      duration: 2000,
    });
  };

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {teachers.map((teacher, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-card rounded-lg border hover:bg-accent/5 transition-colors">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 bg-[#947dc2]">
                <AvatarFallback className="text-white font-medium">
                  {getInitials(teacher.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none mb-1">{teacher.name}</p>
                <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-[#947dc2]/10 text-[#947dc2] rounded-full">
                    {teacher.role}
                  </span>
                  <span className="text-xs text-muted-foreground">{teacher.email}</span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(teacher)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Teacher
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={() => handleDelete(teacher)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
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
