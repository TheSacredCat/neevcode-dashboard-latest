
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { BadgePlus, BookOpen, IndianRupee, Users } from "lucide-react";
import { DashboardMetric } from "@/components/DashboardMetric";
import { RecentSales } from "@/components/RecentSales";
import { TopCourses } from "@/components/TopCourses";
import { TopTeachers } from "@/components/TopTeachers";
import { TeacherList } from "@/components/TeacherList";

const mockChartData = [
  { name: 'Jan', value: 400000 },
  { name: 'Feb', value: 300000 },
  { name: 'Mar', value: 600000 },
  { name: 'Apr', value: 800000 },
  { name: 'May', value: 700000 },
];

const Index = () => {
  return (
    <div className="p-8 animate-in">
      <header className="mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to NeevCode Dashboard</h1>
          <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetric
          title="Total Revenue"
          value="₹15,23,189"
          description="+20.1% from last month"
          icon={<IndianRupee className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardMetric
          title="Active Users"
          value="2,350"
          description="+180 new users"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardMetric
          title="Total Courses"
          value="12"
          description="2 courses added this month"
          icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardMetric
          title="Active Teachers"
          value="15"
          description="3 teachers joined this month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis 
                    stroke="#888888"
                    tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Selling Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <TopCourses />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Performing Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <TopTeachers />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Teacher Management</CardTitle>
          </CardHeader>
          <CardContent>
            <TeacherList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
