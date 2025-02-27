
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
          <CardDescription>
            Manage and organize your course content
          </CardDescription>
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
