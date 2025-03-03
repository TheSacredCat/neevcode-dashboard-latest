
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface DashboardMetricProps {
  title: string;
  value: string;
  description: string;
  trend?: "up" | "down";
  icon?: React.ReactNode;
}

export function DashboardMetric({ title, value, description, trend, icon }: DashboardMetricProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="mt-4">
          <span className="text-2xl font-bold">{value}</span>
          <div className="flex items-center mt-1">
            {trend && (
              trend === "up" ? 
              <ArrowUpIcon className="h-4 w-4 text-emerald-500 mr-1" /> : 
              <ArrowDownIcon className="h-4 w-4 text-rose-500 mr-1" />
            )}
            <p className={cn(
              "text-xs",
              trend === "up" ? "text-emerald-500" : trend === "down" ? "text-rose-500" : "text-muted-foreground"
            )}>
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
