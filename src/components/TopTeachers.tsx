
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function TopTeachers() {
  const teachers = [
    {
      name: "Dr. Sarah Wilson",
      subject: "React & React Native",
      rating: 4.9,
      students: 450,
    },
    {
      name: "Prof. Michael Chen",
      subject: "Advanced JavaScript",
      rating: 4.8,
      students: 380,
    },
    {
      name: "Dr. Emily Brooks",
      subject: "Web Architecture",
      rating: 4.7,
      students: 320,
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
