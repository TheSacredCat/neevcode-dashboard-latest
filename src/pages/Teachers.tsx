
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

interface Teacher {
  id: number;
  name: string;
  role: string;
  customRole?: string;
  subject: string;
  status: "Permanent" | "Intern";
  email: string;
  phone: string;
  avatar?: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export default function Teachers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

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

  const resetForm = () => {
    setName("");
    setRole("");
    setCustomRole("");
    setSubject("");
    setEmail("");
    setPhone("");
    setEmploymentType("");
  };

  const handleSubmit = () => {
    const finalRole = role === "other" ? customRole : role;
    
    // Data validation
    if (!name || !finalRole || !subject || !email || !phone || !employmentType) {
      toast.error("Please fill in all required fields", {
        description: "All fields are required to add a teacher"
      });
      return;
    }
    
    // Create new teacher object
    const newTeacher: Teacher = {
      id: Math.max(0, ...teachers.map(t => t.id)) + 1,
      name,
      role: finalRole,
      subject,
      status: employmentType === "permanent" ? "Permanent" : "Intern",
      email,
      phone,
    };
    
    // Add to state
    setTeachers([...teachers, newTeacher]);
    
    toast.success("Teacher added successfully", {
      description: `${name} has been added to the system`
    });
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setRole(teacher.customRole ? "other" : teacher.role);
    setCustomRole(teacher.customRole || "");
    setSubject(teacher.subject);
    setEmail(teacher.email);
    setPhone(teacher.phone);
    setEmploymentType(teacher.status === "Permanent" ? "permanent" : "intern");
    setIsEditDialogOpen(true);
  };

  const handleUpdateTeacher = () => {
    if (!editingTeacher) return;
    
    const finalRole = role === "other" ? customRole : role;
    
    // Data validation
    if (!name || !finalRole || !subject || !email || !phone || !employmentType) {
      toast.error("Please fill in all required fields", {
        description: "All fields are required to update a teacher"
      });
      return;
    }
    
    // Update teacher
    const updatedTeacher: Teacher = {
      ...editingTeacher,
      name,
      role: finalRole,
      customRole: role === "other" ? customRole : undefined,
      subject,
      status: employmentType === "permanent" ? "Permanent" : "Intern",
      email,
      phone,
    };
    
    // Update state
    setTeachers(teachers.map(t => t.id === editingTeacher.id ? updatedTeacher : t));
    
    toast.success("Teacher updated successfully", {
      description: `${name}'s information has been updated`
    });
    
    setIsEditDialogOpen(false);
    setEditingTeacher(null);
    resetForm();
  };

  const handleDelete = (teacher: Teacher) => {
    // Remove from state
    setTeachers(teachers.filter(t => t.id !== teacher.id));
    
    toast.success("Teacher removed", {
      description: `${teacher.name} has been removed from the system`
    });
  };

  const getStatusColor = (status: string) => {
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Add a new teacher to the system. Fill in all the required information.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-full max-h-[calc(90vh-10rem)]">
              <div className="space-y-4 mt-4 pr-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter teacher's full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={setRole}>
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
                  {role === "other" && (
                    <Input
                      className="mt-2"
                      placeholder="Enter custom role"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || /^[0-9+ -]+$/.test(value)) {
                        setPhone(value);
                      }
                    }}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select value={employmentType} onValueChange={setEmploymentType}>
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
            </ScrollArea>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90" onClick={handleSubmit}>
                Add Teacher
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) {
          setEditingTeacher(null);
          resetForm();
        }
      }}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Update teacher information. Fill in all the required fields.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-full max-h-[calc(90vh-10rem)]">
            <div className="space-y-4 mt-4 pr-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter teacher's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select value={role} onValueChange={setRole}>
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
                {role === "other" && (
                  <Input
                    className="mt-2"
                    placeholder="Enter custom role"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subject">Subject</Label>
                <Input
                  id="edit-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[0-9+ -]+$/.test(value)) {
                      setPhone(value);
                    }
                  }}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-employmentType">Employment Type</Label>
                <Select value={employmentType} onValueChange={setEmploymentType}>
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
          </ScrollArea>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setEditingTeacher(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90" onClick={handleUpdateTeacher}>
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
                  <div className="flex items-center gap-4">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
