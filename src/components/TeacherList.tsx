
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
  status: "Permanent" | "Intern";
  email: string;
}

interface FormData {
  name: string;
  role: string;
  customRole: string;
  subject: string;
  email: string;
  employmentType: string;
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
      email: "john@example.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      subject: "Physics",
      role: "Teacher",
      status: "Permanent",
      email: "jane@example.com"
    },
    {
      id: 3,
      name: "Mike Johnson",
      subject: "Chemistry",
      role: "Assistant Teacher",
      status: "Intern",
      email: "mike@example.com"
    }
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    customRole: "",
    subject: "",
    email: "",
    employmentType: "",
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
      customRole: "",
      subject: "",
      email: "",
      employmentType: "",
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
    const isCustomRole = !["Director", "Lead Instructor", "Instructor", "Teaching Assistant"].includes(teacher.role);
    
    // Set form data first before opening dialog
    setFormData({
      name: teacher.name,
      role: isCustomRole ? "other" : teacher.role,
      customRole: isCustomRole ? teacher.role : "",
      subject: teacher.subject,
      email: teacher.email,
      employmentType: teacher.status === "Permanent" ? "permanent" : "intern",
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
    const { name, role, customRole, subject, email, employmentType } = formData;
    const finalRole = role === "other" ? customRole : role;
    
    if (!name || !finalRole || !subject || !email || !employmentType) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };

  // Update existing teacher
  const handleUpdateTeacher = () => {
    if (!validateForm() || editingId === null) return;
    
    const { name, role, customRole, subject, email, employmentType } = formData;
    const finalRole = role === "other" ? customRole : role;
    
    setTeachers(prev => prev.map(teacher => {
      if (teacher.id === editingId) {
        return {
          ...teacher,
          name,
          role: finalRole,
          subject,
          email,
          status: employmentType === "permanent" ? "Permanent" : "Intern",
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
              <Label htmlFor="edit-role">Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleFormChange("role", value)}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Director">Director</SelectItem>
                  <SelectItem value="Lead Instructor">Lead Instructor</SelectItem>
                  <SelectItem value="Instructor">Instructor</SelectItem>
                  <SelectItem value="Teaching Assistant">Teaching Assistant</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {formData.role === "other" && (
                <Input
                  className="mt-2"
                  placeholder="Enter custom role"
                  value={formData.customRole}
                  onChange={(e) => handleFormChange("customRole", e.target.value)}
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subject">Subject</Label>
              <Input
                id="edit-subject"
                value={formData.subject}
                onChange={(e) => handleFormChange("subject", e.target.value)}
                placeholder="Enter subject"
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
