
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  role: string;
  status: "Permanent" | "Intern" | "Part-Time";
  email: string;
  type: "Admin" | "Trainer";
}

interface FormData {
  name: string;
  role: string;
  subject: string;
  email: string;
  employmentType: string;
  type: string;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "John Doe",
      subject: "Mathematics",
      role: "Senior Teacher",
      status: "Permanent",
      email: "john@example.com",
      type: "Trainer"
    },
    {
      id: 2,
      name: "Jane Smith",
      subject: "Physics",
      role: "Teacher",
      status: "Permanent",
      email: "jane@example.com",
      type: "Trainer"
    },
    {
      id: 3,
      name: "Mike Johnson",
      subject: "Chemistry",
      role: "Assistant Teacher",
      status: "Intern",
      email: "mike@example.com",
      type: "Trainer"
    }
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    subject: "",
    email: "",
    employmentType: "",
    type: "",
  });

  // Form field update handler
  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      subject: "",
      email: "",
      employmentType: "",
      type: "",
    });
  };

  // Critical fix: Properly handle dialog closing
  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
    // Use setTimeout to ensure state updates don't conflict
    setTimeout(() => {
      setEditingId(null);
      resetForm();
    }, 150);
  };

  // Start editing a teacher - Fixed order of operations
  const handleStartEdit = (teacher: Teacher) => {
    // Set form data first before opening dialog
    setFormData({
      name: teacher.name,
      role: teacher.role,
      subject: teacher.subject,
      email: teacher.email,
      employmentType: teacher.status === "Permanent" ? "permanent" : 
                     teacher.status === "Intern" ? "intern" : "part-time",
      type: teacher.type,
    });
    
    // Set editing ID
    setEditingId(teacher.id);
    
    // Open dialog last
    setTimeout(() => {
      setIsEditDialogOpen(true);
    }, 10);
  };

  // Validation function
  const validateForm = (): boolean => {
    const { name, role, email, employmentType, type } = formData;
    
    if (!name || !role || !email || !employmentType || !type) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };

  // Update existing teacher
  const handleUpdateTeacher = () => {
    if (!validateForm() || editingId === null) return;
    
    const { name, role, subject, email, employmentType, type } = formData;
    
    const status = 
      employmentType === "permanent" ? "Permanent" : 
      employmentType === "intern" ? "Intern" : "Part-Time";
    
    setTeachers(prev => prev.map(teacher => {
      if (teacher.id === editingId) {
        return {
          ...teacher,
          name,
          role,
          subject,
          email,
          status,
          type: type as "Admin" | "Trainer"
        };
      }
      return teacher;
    }));
    
    toast.success("Teacher updated successfully");
    handleDialogClose();
  };

  // Delete a teacher
  const handleDeleteTeacher = (id: number) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
    toast.success("Teacher removed successfully");
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-[#947dc2]">
                    <AvatarFallback className="text-black dark:text-white">
                      {getInitials(teacher.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{teacher.name}</span>
                </div>
              </TableCell>
              <TableCell>{teacher.type}</TableCell>
              <TableCell>{teacher.subject}</TableCell>
              <TableCell>{teacher.role}</TableCell>
              <TableCell>
                <Badge
                  variant={teacher.status === "Permanent" ? "default" : "outline"}
                >
                  {teacher.status}
                </Badge>
              </TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleStartEdit(teacher)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-600"
                    onClick={() => handleDeleteTeacher(teacher.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog - With critical fixes for responsiveness */}
      <Dialog 
        open={isEditDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Update teacher information. Fill in all the required fields.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                placeholder="Enter teacher's full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleFormChange("type", value)}
              >
                <SelectTrigger id="edit-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Trainer">Trainer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Input
                id="edit-role"
                value={formData.role}
                onChange={(e) => handleFormChange("role", e.target.value)}
                placeholder="Enter role"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subject">Subject {formData.type === "Admin" && "(Optional)"}</Label>
              <Input
                id="edit-subject"
                value={formData.subject}
                onChange={(e) => handleFormChange("subject", e.target.value)}
                placeholder="Enter subject"
                required={formData.type !== "Admin"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-employmentType">Employment Type</Label>
              <Select 
                value={formData.employmentType} 
                onValueChange={(value) => handleFormChange("employmentType", value)}
              >
                <SelectTrigger id="edit-employmentType">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                  <SelectItem value="part-time">Part-Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              onClick={handleDialogClose}
            >
              Cancel
            </Button>
            <Button 
              className="bg-[#947dc2] hover:bg-[#947dc2]/90" 
              onClick={handleUpdateTeacher}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
