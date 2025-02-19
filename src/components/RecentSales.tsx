
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RecentSales() {
  const transactions = [
    {
      name: "Rahul Sharma",
      course: "React Masterclass",
      amount: "₹14,999",
      time: "2 minutes ago"
    },
    {
      name: "Priya Patel",
      course: "Advanced JavaScript",
      amount: "₹12,499",
      time: "4 minutes ago"
    },
    {
      name: "Amit Kumar",
      course: "UI/UX Design",
      amount: "₹9,999",
      time: "6 minutes ago"
    },
    {
      name: "Sneha Gupta",
      course: "Node.js Backend",
      amount: "₹11,999",
      time: "8 minutes ago"
    }
  ];

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-6">
        {transactions.map((transaction, i) => (
          <div key={i} className="flex items-center justify-between space-x-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
            <div className="flex items-center space-x-4">
              <Avatar className="h-9 w-9" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">{transaction.course}</p>
                <p className="text-xs text-muted-foreground">{transaction.time}</p>
              </div>
            </div>
            <div className="font-medium">{transaction.amount}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
