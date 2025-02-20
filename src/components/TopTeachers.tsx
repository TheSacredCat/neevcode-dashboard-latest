
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function TopTeachers() {
  const teachers = [
    {
      name: "Dr. Pallavi Kamra",
      Subject: "Teacher Training & Student Counseling",
      rating: 5.0,
      students: 450,
    },
    {
      name: "Mr. Savyasaachi V.",
      subject: "Advanced Python",
      rating: 4.8,
      students: 7,
    },
    {
      name: "Ms. Shine RIjie",
      subject: "Designing",
      rating: 4.7,
      students: 10,
    },
  ];

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-6">
        {teachers.map((teacher, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Avatar className="h-12 w-12" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{teacher.name}</p>
                <Badge variant="secondary">{teacher.rating} ★</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {teacher.subject}
              </p>
              <p className="text-xs text-muted-foreground">
                {teacher.students} active students
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
