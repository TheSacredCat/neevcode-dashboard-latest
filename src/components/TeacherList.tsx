
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

type Teacher = {
  id: number;
  name: string;
  subject: string;
  role: string;
  status: "Permanent" | "Intern";
  email: string;
};

export function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "Dr. Pallavi Kamra",
      subject: "Teacher Training & Student Counseling",
      role: "Director",
      status: "Permanent",
      email: "dr.pallavi.k@neevcode.com",
    },
    {
      id: 2,
      name: "Savyasaachi V.",
      subject: "Advanced Python",
      role: "Lead Instructor",
      status: "Permanent",
      email: "savyasaachi.v@neevcode.com",
    },
    {
      id: 3,
      name: "Shine Rijie",
      subject: "UI/UX Design",
      role: "Design Lead",
      status: "Permanent",
      email: "shine.r@neevcode.com",
    },
    {
      id: 4,
      name: "Ashish Jaisawl",
      subject: "Networking",
      role: "Technical Instructor",
      status: "Intern",
      email: "ashish.j@neevcode.com",
    },
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    subject: "",
    role: "",
    status: "",
    email: "",
  });

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setEditForm({
      name: teacher.name,
      subject: teacher.subject,
      role: teacher.role,
      status: teacher.status,
      email: teacher.email,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (teacher: Teacher) => {
    setTeachers(teachers.filter(t => t.id !== teacher.id));
    toast.success("Teacher removed", {
      description: `${teacher.name} has been removed from the system`,
      duration: 2000,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    const updatedTeachers = teachers.map(teacher => {
      if (teacher.id === editingTeacher.id) {
        return {
          ...teacher,
          ...editForm,
        };
      }
      return teacher;
    });

    setTeachers(updatedTeachers);
    setIsEditDialogOpen(false);
    setEditingTeacher(null);
    toast.success("Teacher updated", {
      description: `${editForm.name}'s information has been updated`,
      duration: 2000,
    });
  };

  return (
    <>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="flex items-center justify-between p-4 bg-card rounded-lg border hover:bg-accent/5 transition-colors">
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Update the teacher's information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={editForm.subject}
                onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={editForm.status} 
                onValueChange={(value) => setEditForm({ ...editForm, status: value as "Permanent" | "Intern" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Permanent">Permanent</SelectItem>
                  <SelectItem value="Intern">Intern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#947dc2] hover:bg-[#947dc2]/90">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
