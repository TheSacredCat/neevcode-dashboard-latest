
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";

export function TopCourses() {
  const courses = [
    {
      title: "React Masterclass",
      students: 1234,
      revenue: "₹18,420",
      growth: "+12%"
    },
    {
      title: "Vue.js Fundamentals",
      students: 890,
      revenue: "₹13,350",
      growth: "+8%"
    },
    {
      title: "Node.js Backend",
      students: 756,
      revenue: "₹11,340",
      growth: "+15%"
    }
  ];

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-6">
        {courses.map((course, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{course.title}</p>
              <p className="text-sm text-muted-foreground">
                {course.students} students
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{course.revenue}</p>
              <p className="text-sm text-emerald-500">{course.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
