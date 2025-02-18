
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardMetricProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export function DashboardMetric({ title, value, description, icon }: DashboardMetricProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="mt-4">
          <span className="text-2xl font-bold">{value}</span>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
