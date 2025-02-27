
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

export default function Index() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetric
          title="Total Revenue"
          value="₹45,231.89"
          description="+20.1% from last month"
          trend="up"
          icon={<CreditCard className="h-4 w-4 text-[#9b87f5]" />}
        />
        <DashboardMetric
          title="Enrollments"
          value="2,350"
          description="+180.1% from last month"
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
          title="Avg. Completion Rate"
          value="78.5%"
          description="+201 students graduated"
          trend="down"
          icon={<BarChart3 className="h-4 w-4 text-[#9b87f5]" />}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="careers">Career Inquiries</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] bg-gradient-to-r from-[#947dc2]/20 to-[#d6bcfa]/20 rounded-md flex items-center justify-center">
                  <img
                    src="/images/dashboard-chart.png"
                    alt="Revenue chart"
                    className="w-full"
                  />
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
              <Button variant="outline" className="gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <TeacherList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View detailed analytics about your courses and students.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[450px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">Analytics dashboard coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                View and download reports about your business.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[450px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">Reports dashboard coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="careers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Career Inquiries</CardTitle>
              <CardDescription>
                View and manage job applications and inquiries from the careers page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-[#947dc2]/10 p-4 rounded-md border border-[#947dc2]/20">
                  <h3 className="font-medium text-[#947dc2]">Rahul Sharma</h3>
                  <p className="text-sm text-muted-foreground mt-1">Applied for: UI/UX Designer</p>
                  <p className="text-sm mt-2">I'm a passionate designer with 3 years of experience in creating user interfaces for educational platforms.</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">June 15, 2023</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
                <div className="bg-[#947dc2]/10 p-4 rounded-md border border-[#947dc2]/20">
                  <h3 className="font-medium text-[#947dc2]">Priya Patel</h3>
                  <p className="text-sm text-muted-foreground mt-1">Applied for: Python Instructor</p>
                  <p className="text-sm mt-2">Software engineer with 5+ years of Python experience looking to transition into teaching.</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">June 12, 2023</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
                <div className="bg-[#947dc2]/10 p-4 rounded-md border border-[#947dc2]/20">
                  <h3 className="font-medium text-[#947dc2]">Amit Kumar</h3>
                  <p className="text-sm text-muted-foreground mt-1">Applied for: Cybersecurity Expert</p>
                  <p className="text-sm mt-2">Certified cybersecurity professional with experience in network security and ethical hacking.</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">June 10, 2023</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
