
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { BadgePlus, BookOpen, DollarSign, Users } from "lucide-react";
import { DashboardMetric } from "@/components/DashboardMetric";
import { RecentSales } from "@/components/RecentSales";
import { TopCourses } from "@/components/TopCourses";

const mockChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8 animate-in">
      <header className="mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to NeevCode Dashboard</h1>
          <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetric
          title="Total Revenue"
          value="$15,231.89"
          description="+20.1% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
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
          title="Course Completion"
          value="85%"
          description="Average completion rate"
          icon={<BadgePlus className="h-4 w-4 text-muted-foreground" />}
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
                  <YAxis stroke="#888888" />
                  <Tooltip />
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
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <TopCourses />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Course Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">React Masterclass</span>
                  <span className="text-sm text-muted-foreground">89%</span>
                </div>
                <Progress value={89} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Vue.js Fundamentals</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Node.js Backend</span>
                  <span className="text-sm text-muted-foreground">95%</span>
                </div>
                <Progress value={95} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
