import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Search, Eye, Trash2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

const sampleMessages = [
  {
    id: 1,
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@example.com",
    message: "I'm interested in the Python course. Can you provide more details about the curriculum and duration?",
    date: "2023-07-15T10:30:00",
    isRead: true,
  },
  {
    id: 2,
    firstName: "Aisha",
    lastName: "Patel",
    email: "aisha.patel@example.com",
    message: "I'm having trouble accessing the course materials. I purchased the Web Development course last week but can't access the videos. I've tried logging out and logging back in, clearing my cache, and using different browsers, but I still can't see the content. Could you please help me resolve this issue as soon as possible? Thank you for your assistance.",
    date: "2023-07-18T14:45:00",
    isRead: false,
  },
  {
    id: 3,
    firstName: "Sanjay",
    lastName: "Gupta",
    email: "sanjay.gupta@example.com",
    message: "I wanted to inquire about your corporate training options. We have a team of 15 developers who need upskilling in React and Node.js. We are looking for a comprehensive program that can be customized to our team's specific needs and can be delivered over a period of 3-6 months. Could you please provide details about your corporate training packages, pricing, and scheduling options? Additionally, do you offer any assessments before and after the training to measure improvement?",
    date: "2023-07-19T09:15:00",
    isRead: false,
  },
  {
    id: 4,
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com",
    message: "I completed the Data Science course and it was excellent! I'm wondering if you offer any advanced courses on machine learning or AI?",
    date: "2023-07-20T11:20:00",
    isRead: true,
  },
  {
    id: 5,
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@example.com",
    message: "Do you offer any discounts for students? I'm currently pursuing my Bachelor's in Computer Science and am interested in your cybersecurity course.",
    date: "2023-07-21T16:05:00",
    isRead: false,
  }
];

export default function Messages() {
  const [messages, setMessages] = useState(sampleMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<typeof sampleMessages[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredMessages = messages.filter(
    (message) =>
      message.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewMessage = (message: typeof sampleMessages[0]) => {
    setMessages(
      messages.map((m) =>
        m.id === message.id ? { ...m, isRead: true } : m
      )
    );
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground flex items-center">
            View and respond to contact messages
            {unreadCount > 0 && (
              <Badge variant="outline" className="ml-2 bg-[#E5DEFF] text-[#7E69AB] border-[#9b87f5]">
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>
                Messages from the website contact form
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Preview</TableHead>
                  <TableHead className="text-right w-10">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No messages found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((message) => (
                    <TableRow key={message.id} className={!message.isRead ? "bg-[#E5DEFF]/30" : ""}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {!message.isRead && (
                            <div className="w-2 h-2 rounded-full bg-[#9b87f5]" />
                          )}
                          {message.firstName} {message.lastName}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{message.email}</TableCell>
                      <TableCell className="hidden lg:table-cell whitespace-nowrap">{formatDate(message.date)}</TableCell>
                      <TableCell className="hidden sm:table-cell max-w-xs truncate">
                        {message.message.substring(0, 50)}...
                      </TableCell>
                      <TableCell className="text-right p-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewMessage(message)}
                          aria-label="View message"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.firstName} {selectedMessage?.lastName}</DialogTitle>
            <DialogDescription>
              Received on {selectedMessage && formatDate(selectedMessage.date)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div>
              <p className="text-sm font-medium mb-1">From:</p>
              <p>{selectedMessage?.firstName} {selectedMessage?.lastName} ({selectedMessage?.email})</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Message:</p>
              <div className="p-4 bg-muted rounded-md max-h-[200px] overflow-y-auto">
                <p>{selectedMessage?.message}</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline">
                Reply via Email
              </Button>
              <Button 
                variant="outline"
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white border-none h-9 text-xs px-3"
              >
                Mark as Resolved
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
