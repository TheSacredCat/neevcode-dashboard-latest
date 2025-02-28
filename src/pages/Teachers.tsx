
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MoreVertical, Pencil, Trash2, Phone, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

type Teacher = {
  id: number;
  name: string;
  role: string;
  subject: string;
  status: "Permanent" | "Intern";
  email: string;
  phone: string;
  avatar?: string;
};

type FormData = {
  name: string;
  role: string;
  customRole: string;
  subject: string;
  email: string;
  phone: string;
  employmentType: string;
};

// Function to get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export default function Teachers() {
  // Dialog visibility state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    customRole: "",
    subject: "",
    email: "",
    phone: "",
    employmentType: "",
  });
  
  // Teachers data
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "Dr. Pallavi Kamra",
      role: "Director",
      subject: "Teacher Training & Student Counseling",
      status: "Permanent",
      email: "dr.pallavi.k@neevcode.com",
      phone: "+91 98765 43210"
    },
    {
      id: 2,
      name: "Savyasaachi V.",
      role: "Lead Instructor",
      subject: "Advanced Python",
      status: "Permanent",
      email: "savyasaachi.v@neevcode.com",
      phone: "+91 98765 43211"
    },
    {
      id: 3,
      name: "Shine Rijie",
      role: "Design Lead",
      subject: "UI/UX Design",
      status: "Permanent",
      email: "shine.r@neevcode.com",
      phone: "+91 98765 43212"
    },
    {
      id: 4,
      name: "Ashish Jaisawl",
      role: "Technical Instructor",
      subject: "Networking",
      status: "Intern",
      email: "ashish.j@neevcode.com",
      phone: "+91 98765 43213"
    },
  ]);

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
      phone: "",
      employmentType: "",
    });
  };

  // Validation function
  const validateForm = (): boolean => {
    const { name, role, customRole, subject, email, phone, employmentType } = formData;
    const finalRole = role === "other" ? customRole : role;
    
    if (!name || !finalRole || !subject || !email || !phone || !employmentType) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };

  // Add new teacher
  const handleAddTeacher = () => {
    if (!validateForm()) return;
    
    const { name, role, customRole, subject, email, phone, employmentType } = formData;
    const finalRole = role === "other" ? customRole : role;
    
    const newTeacher: Teacher = {
      id: Math.max(0, ...teachers.map(t => t.id)) + 1,
      name,
      role: finalRole,
      subject,
      status: employmentType === "permanent" ? "Permanent" : "Intern",
      email,
      phone,
    };
    
    setTeachers(prev => [...prev, newTeacher]);
    toast.success("Teacher added successfully");
    setIsAddDialogOpen(false);
    resetForm();
  };

  // Start editing a teacher
  const handleStartEdit = (teacher: Teacher) => {
    setEditingId(teacher.id);
    const isCustomRole = !["Director", "Lead Instructor", "Instructor", "Teaching Assistant"].includes(teacher.role);
    
    setFormData({
      name: teacher.name,
      role: isCustomRole ? "other" : teacher.role,
      customRole: isCustomRole ? teacher.role : "",
      subject: teacher.subject,
      email: teacher.email,
      phone: teacher.phone,
      employmentType: teacher.status === "Permanent" ? "permanent" : "intern",
    });
    
    setIsEditDialogOpen(true);
  };

  // Update existing teacher
  const handleUpdateTeacher = () => {
    if (!validateForm() || editingId === null) return;
    
    const { name, role, customRole, subject, email, phone, employmentType } = formData;
    const finalRole = role === "other" ? customRole : role;
    
    setTeachers(prev => prev.map(teacher => {
      if (teacher.id === editingId) {
        return {
          ...teacher,
          name,
          role: finalRole,
          subject,
          email,
          phone,
          status: employmentType === "permanent" ? "Permanent" : "Intern",
        };
      }
      return teacher;
    }));
    
    toast.success("Teacher updated successfully");
    setIsEditDialogOpen(false);
    setEditingId(null);
    resetForm();
  };

  // Delete a teacher
  const handleDeleteTeacher = (id: number) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
    toast.success("Teacher removed successfully");
  };

  // Status color
  const getStatusColor = (status: string): string => {
    return status === "Permanent" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teacher Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your teaching staff and their information
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Add a new teacher to the system. Fill in all the required information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="Enter teacher's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => handleFormChange("role", value)}
                >
                  <SelectTrigger>
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
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleFormChange("subject", e.target.value)}
                  placeholder="Enter subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[0-9+ -]+$/.test(value)) {
                      handleFormChange("phone", value);
                    }
                  }}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select 
                  value={formData.employmentType} 
                  onValueChange={(value) => handleFormChange("employmentType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">Permanent</SelectItem>
                    <SelectItem value="intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#947dc2] hover:bg-[#947dc2]/90" 
                onClick={handleAddTeacher}
              >
                Add Teacher
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog 
        open={isEditDialogOpen} 
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setEditingId(null);
            resetForm();
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
                <SelectTrigger>
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
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9+ -]+$/.test(value)) {
                    handleFormChange("phone", value);
                  }
                }}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-employmentType">Employment Type</Label>
              <Select 
                value={formData.employmentType} 
                onValueChange={(value) => handleFormChange("employmentType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditingId(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button 
              className="bg-[#947dc2] hover:bg-[#947dc2]/90" 
              onClick={handleUpdateTeacher}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 bg-[#947dc2]">
                      {teacher.avatar ? (
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                      ) : (
                        <AvatarFallback className="text-black dark:text-white">
                          {getInitials(teacher.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <div className="text-sm text-muted-foreground">{teacher.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{teacher.role}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{teacher.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{teacher.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
                    {teacher.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStartEdit(teacher)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Teacher
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Teacher
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
