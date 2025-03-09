
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ChevronRight, Users, CreditCard, GraduationCap, BarChart3, ArrowLeft } from "lucide-react";
import { DashboardMetric } from "@/components/DashboardMetric";
import { TopTeachers } from "@/components/TopTeachers";
import { TopCourses } from "@/components/TopCourses";
import { RecentSales } from "@/components/RecentSales";
import TeacherList from "@/components/TeacherList";
import { ApplicantCard } from "@/components/ApplicantCard";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const [careerView, setCareerView] = useState<"pending" | "reviewed">("pending");
  
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      position: "UI/UX Designer",
      description: "I'm a passionate designer with 3 years of experience in creating user interfaces for educational platforms.",
      date: "June 15, 2023",
      resumeUrl: "/resumes/rahul-sharma-resume.pdf",
      education: "Bachelor of Design, NID Ahmedabad",
      skills: "Figma, Adobe XD, User Research, Prototyping",
      email: "rahul.sharma@example.com",
      linkedinProfile: "https://linkedin.com/in/rahul-sharma-example",
      whyJoinUs: "I'm excited about the opportunity to design educational interfaces that can make learning more accessible and engaging for students of all backgrounds.",
      availability: "Immediate joining",
      reviewed: false
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Python Instructor",
      description: "Software engineer with 5+ years of Python experience looking to transition into teaching.",
      date: "June 12, 2023",
      resumeUrl: "/resumes/priya-patel-resume.pdf",
      education: "MS Computer Science, IIT Delhi",
      skills: "Python, Django, Flask, Data Science, Machine Learning",
      email: "priya.patel@example.com",
      linkedinProfile: "",
      whyJoinUs: "After years of working in the industry, I've discovered my passion for teaching and mentoring. I want to help students build real-world skills that will prepare them for tech careers.",
      availability: "Available from August 1st",
      reviewed: false
    },
    {
      id: 3,
      name: "Amit Kumar",
      position: "Cybersecurity Expert",
      description: "Certified cybersecurity professional with experience in network security and ethical hacking.",
      date: "June 10, 2023",
      resumeUrl: "/resumes/amit-kumar-resume.pdf",
      education: "B.Tech Computer Science, BITS Pilani",
      skills: "Network Security, Penetration Testing, CISSP Certified",
      email: "amit.kumar@example.com",
      linkedinProfile: "https://linkedin.com/in/amit-kumar-example",
      whyJoinUs: "Cybersecurity education is becoming increasingly important, and I want to contribute to creating a generation of security-conscious professionals.",
      availability: "2 weeks notice period",
      reviewed: false
    }
  ]);

  const handleClick = () => {
    navigate('/Teachers');
  };

  const handleDeleteApplicant = (id: number) => {
    setApplicants(applicants.filter(applicant => applicant.id !== id));
  };

  const handleMarkReviewed = (id: number, reviewed: boolean) => {
    setApplicants(applicants.map(applicant => 
      applicant.id === id ? { ...applicant, reviewed } : applicant
    ));
  };

  const pendingApplicants = applicants.filter(applicant => !applicant.reviewed);
  const reviewedApplicants = applicants.filter(applicant => applicant.reviewed);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
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
          title="Avg. Views"
          value="200"
          description="+10% then last week"
          trend="up"
          icon={<BarChart3 className="h-4 w-4 text-[#9b87f5]" />}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full grid grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="py-2 text-xs sm:text-sm md:text-base">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="py-2 text-xs sm:text-sm md:text-base">Analytics</TabsTrigger>
          <TabsTrigger value="reports" className="py-2 text-xs sm:text-sm md:text-base">Reports</TabsTrigger>
          <TabsTrigger value="careers" className="py-2 text-xs sm:text-sm md:text-base whitespace-normal">
            {isMobile ? "Careers" : "Career Inquiries"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
                        tickFormatter={(value) => `₹${value / 1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`₹${value}`, 'Revenue']}
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Career Inquiries</CardTitle>
                  <CardDescription>
                    View and manage job applications and inquiries from the careers page.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {careerView === "reviewed" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCareerView("pending")}
                      className="flex items-center gap-1"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back to Pending
                    </Button>
                  )}
                  {careerView === "pending" && reviewedApplicants.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCareerView("reviewed")}
                      className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      View Reviewed ({reviewedApplicants.length})
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careerView === "pending" ? (
                  pendingApplicants.length > 0 ? (
                    pendingApplicants.map((applicant) => (
                      <ApplicantCard 
                        key={applicant.id} 
                        applicant={applicant} 
                        onDelete={handleDeleteApplicant}
                        onMarkReviewed={handleMarkReviewed}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No pending applications
                    </div>
                  )
                ) : (
                  reviewedApplicants.length > 0 ? (
                    reviewedApplicants.map((applicant) => (
                      <ApplicantCard 
                        key={applicant.id} 
                        applicant={applicant} 
                        onDelete={handleDeleteApplicant}
                        onMarkReviewed={handleMarkReviewed}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No reviewed applications
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
