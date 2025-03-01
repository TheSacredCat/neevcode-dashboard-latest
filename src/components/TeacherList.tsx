import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the Teacher type
type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
  role: string;
};

// Mock teacher data
const data: Teacher[] = [
  {
    id: 1,
    name: "Dr. Pallavi Kamra",
    email: "pallavi.kamra@example.com",
    subject: "Teacher Training & Student Counseling",
    role: "Director",
  },
  {
    id: 2,
    name: "Mr. Savyasaachi V.",
    email: "savyasaachi.v@example.com",
    subject: "Advanced Python",
    role: "Lead Instructor",
  },
  {
    id: 3,
    name: "Ms. Shine RIjie",
    email: "shine.rijie@example.com",
    subject: "Designing",
    role: "Instructor",
  },
];

export default function TeacherList() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [role, setRole] = useState<
    "Director" | "Lead Instructor" | "Instructor" | "Teaching Assistant" | "Custom"
  >("Director");
  const [customRole, setCustomRole] = useState("");
  const [isCustomRole, setIsCustomRole] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setRole("Director");
    setCustomRole("");
    setIsCustomRole(false);
  };

  // Critical fix: Properly handle dialog closing with clean state management
  const handleDialogClose = () => {
    // First set the dialog to closed
    setIsEditDialogOpen(false);
    
    // Use a longer timeout to ensure state updates don't conflict
    setTimeout(() => {
      // Then clear the editing state
      setEditingId(null);
      // Reset form values
      resetForm();
    }, 300);
  };

  // Start editing a teacher - Fixed order of operations
  const handleStartEdit = (teacher: Teacher) => {
    // First check if editing is already in progress
    if (editingId) {
      // If editing, cancel current edit before starting new one
      handleDialogClose();
      
      // Use setTimeout to ensure state is cleared before starting new edit
      setTimeout(() => {
        startEditing(teacher);
      }, 350);
    } else {
      startEditing(teacher);
    }
  };
  
  // Helper function to start editing
  const startEditing = (teacher: Teacher) => {
    const isCustomRole = !["Director", "Lead Instructor", "Instructor", "Teaching Assistant"].includes(teacher.role);
    
    // Reset form first to clear any previous values
    resetForm();
    
    // Set form values after reset
    setName(teacher.name);
    setEmail(teacher.email);
    setSubject(teacher.subject);
    setIsCustomRole(isCustomRole);
    setRole(isCustomRole ? "Custom" : teacher.role);
    setCustomRole(isCustomRole ? teacher.role : "");
    
    // Set editing ID
    setEditingId(teacher.id);
    
    // Open dialog last, with a delay to ensure form is ready
    setTimeout(() => {
      setIsEditDialogOpen(true);
    }, 50);
  };

  const validateForm = () => {
    if (!name || !email || !subject) {
      toast.error("Please fill in all fields.");
      return false;
    }
    if (role === "Custom" && !customRole) {
      toast.error("Please specify a custom role.");
      return false;
    }
    return true;
  };

  const handleSaveEdit = () => {
    if (!validateForm()) return;

    // Here you would typically send the updated data to your backend
    toast.success(`Teacher ${name} updated successfully!`);
    handleDialogClose();
  };

  const handleDeleteTeacher = (teacherId: number) => {
    // Here you would typically send a delete request to your backend
    toast.success(`Teacher deleted successfully!`);
  };

  const columns: ColumnDef<Teacher>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "subject",
      header: "Subject",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const teacher = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStartEdit(teacher)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteTeacher(teacher.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Edit Dialog - With improved state management */}
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
              Make changes to the teacher information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form id="edit-teacher-form" onSubmit={(e) => {
            e.preventDefault();
            handleSaveEdit();
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher-name" className="text-right">Name</Label>
                <Input
                  id="teacher-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher-email" className="text-right">Email</Label>
                <Input
                  id="teacher-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher-subject" className="text-right">Subject</Label>
                <Input
                  id="teacher-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher-role" className="text-right">Role</Label>
                <Select
                  value={role}
                  onValueChange={(value) => {
                    setRole(value);
                    setIsCustomRole(value === "Custom");
                  }}
                >
                  <SelectTrigger id="teacher-role" className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Director">Director</SelectItem>
                    <SelectItem value="Lead Instructor">Lead Instructor</SelectItem>
                    <SelectItem value="Instructor">Instructor</SelectItem>
                    <SelectItem value="Teaching Assistant">Teaching Assistant</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {isCustomRole && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher-custom-role" className="text-right">Custom Role</Label>
                  <Input
                    id="teacher-custom-role"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              )}
            </div>
          </form>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose} type="button">
              Cancel
            </Button>
            <Button 
              form="edit-teacher-form" 
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
