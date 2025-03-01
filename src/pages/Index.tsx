import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ChevronRight, Users, CreditCard, GraduationCap, BarChart3 } from "lucide-react";
import { DashboardMetric } from "@/components/DashboardMetric";
import { TopTeachers } from "@/components/TopTeachers";
import { TopCourses } from "@/components/TopCourses";
import { RecentSales } from "@/components/RecentSales";
import TeacherList from "@/components/TeacherList";
import { ApplicantCard } from "@/components/ApplicantCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Revenue data for the chart
const revenueData = [
  { name: "Jan", revenue: 12800 },
  { name: "Feb", revenue: 18300 },
  { name: "Mar", revenue: 23400 },
  { name: "Apr", revenue: 29500 },
  { name: "May", revenue: 25600 },
  { name: "Jun", revenue: 32700 },
  { name: "Jul", revenue: 38100 },
  { name: "Aug", revenue: 36400 },
  { name: "Sep", revenue: 42500 },
  { name: "Oct", revenue: 45200 },
  { name: "Nov", revenue: 43800 },
  { name: "Dec", revenue: 52100 },
];

export default function Index() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Teachers');
  };

  return (
    <div className="flex flex-col gap-6 px-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Download Report</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
        <DashboardMetric
          title="Total Revenue"
          value="$45,231.89"
          description="+203% from last month"
          trend="up"
          icon={<CreditCard className="h-4 w-4 text-[#9b87f5]" />}
        />
        <DashboardMetric
          title="Enrollments"
          value="2,350"
          description="+180.7% from last month"
          trend="up"
          icon={<Users className="h-4 w-4 text-[#9b87f5]" />}
        />
        <DashboardMetric
          title="Active Students"
          value="1,763"
          description="+19% from last month"
          trend="up"
          icon={<GraduationCap className="h-4 w-4 text-[#9b87f5]" />}
        />
        <DashboardMetric
          title="Avg. Views"
          value="200"
          description="+10% from last week"
          trend="up"
          icon={<BarChart3 className="h-4 w-4 text-[#9b87f5]" />}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4 w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="careers">Career Inquiries</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 w-full">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#9b87f5"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 w-full">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Teachers</CardTitle>
                <CardDescription>
                  Teachers with highest student ratings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopTeachers />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Popular Courses</CardTitle>
                  <CardDescription>
                    Top performing courses this month.
                  </CardDescription>
                </div>
                <Button variant="ghost" className="gap-1">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <TopCourses />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Teaching Staff</CardTitle>
                <CardDescription>
                  Manage your teaching staff and their information.
                </CardDescription>
              </div>
              <Button variant="outline" className="gap-1" onClick={handleClick}>
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <TeacherList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
