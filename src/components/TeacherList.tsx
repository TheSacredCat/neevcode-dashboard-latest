import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  role: string;
  status: "Permanent" | "Intern";
  email: string;
}

export default function TeacherList() {
  const [teachers] = useState<Teacher[]>([
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Teacher List</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.id}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.role}</TableCell>
                <TableCell>
                  <Badge variant={teacher.status === "Permanent" ? "default" : "secondary"}>
                    {teacher.status}
                  </Badge>
                </TableCell>
                <TableCell>{teacher.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
