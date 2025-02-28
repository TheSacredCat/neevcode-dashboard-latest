
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ContentManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your course content and learning materials
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              Manage and organize your course content
            </CardDescription>
          </div>
          <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Review
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[450px] flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Content management dashboard coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
