
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RecentSales() {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center">
            <Avatar className="h-9 w-9" />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium">Student {i + 1}</p>
              <p className="text-sm text-muted-foreground">
                Purchased React Masterclass
              </p>
            </div>
            <div className="ml-auto font-medium">+$149.00</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
