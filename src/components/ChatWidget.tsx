import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  avatar: string;
}

const teachers: Teacher[] = [
  { id: 1, name: "Dr. Pallavi Kamra", subject: "Counsellor", avatar: "PK" },
  { id: 2, name: "Shine Rijie", subject: "UI/UX", avatar: "SR" },
  { id: 3, name: "Savyasaachi Vanga", subject: "Python", avatar: "SV" },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-card border rounded-lg shadow-lg w-80">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">
              {selectedTeacher ? `Chat with ${selectedTeacher.name}` : 'Select Teacher'}
            </h3>
            <Button variant="ghost" size="icon" onClick={() => {
              setIsOpen(false);
              setSelectedTeacher(null);
            }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {!selectedTeacher ? (
            <ScrollArea className="h-96 p-4">
              <div className="space-y-2">
                {teachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="flex items-center space-x-4 p-2 hover:bg-accent rounded-lg cursor-pointer"
                    onClick={() => setSelectedTeacher(teacher)}
                  >
                    <Avatar>
                      <AvatarFallback>{teacher.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{teacher.name}</p>
                      <p className="text-xs text-muted-foreground">{teacher.subject} Expert</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="h-96 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="text-center text-sm text-muted-foreground">
                  Start your conversation with {selectedTeacher.name}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." />
                  <Button size="icon" className="bg-[#947dc2] hover:bg-[#947dc2]/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg bg-[#947dc2] hover:bg-[#947dc2]/90"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
