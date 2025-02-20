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
  { name: 'Jan', value: 20000 },
  { name: 'Feb', value: 35000 },
  { name: 'Mar', value: 45000 },
  { name: 'Apr', value: 80000 },
  { name: 'May', value: 65000 },
];

const Index = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in">
      <header className="mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to NeevCode Dashboard</h1>
          <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
        </div>
      </header>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#0D5F6C] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <IndianRupee className="h-5 w-5" />
                <span className="text-sm font-medium">Total Sales</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">100 Students</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">₹4,59,100</h2>
              <div className="flex items-center text-xs">
                <span className="text-emerald-400">+4.5%</span>
                <span className="ml-2">than last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#8B5CF6] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Total Users</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">+140 People</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">240</h2>
              <div className="flex items-center text-xs">
                <span className="text-emerald-400">+150%</span>
                <span className="ml-2">than last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0D5F6C] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Avg. Client Rating</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">1500 Reviews</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">8.8/10</h2>
              <div className="flex items-center text-xs">
                <span className="text-emerald-400">+2.5%</span>
                <span className="ml-2">than last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis 
                    stroke="#888888"
                    tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`}
                    domain={[0, 100000]}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#947dc2"
                    strokeWidth={2}
                    fill="#947dc2"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Latest Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Top Selling Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <TopCourses />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Our Teachers</CardTitle>
            <p className="text-sm text-muted-foreground">
              Meet our expert instructors
            </p>
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
