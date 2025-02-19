
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <span className="text-sm font-medium">Total Views</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">+2400 People</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">2,400</h2>
              <div className="flex items-center text-xs">
                <span className="text-emerald-400">+4.5%</span>
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

      <div className="grid gap-6 grid-cols-7 mt-6">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
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
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fill="#8B5CF6"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Our Teachers</CardTitle>
            <p className="text-sm text-muted-foreground">
              Meet our teachers and see their expertise
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
