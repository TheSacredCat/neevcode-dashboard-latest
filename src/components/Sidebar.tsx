
import { cn } from "@/lib/utils";
import { BookOpen, Home, Users, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Users, label: "Teachers", path: "/teachers" },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 z-20 min-h-screen bg-background border-r flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        "md:relative"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!isCollapsed && <h2 className="text-xl font-bold text-[#947dc2]">NeevCode</h2>}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors my-1",
                isActive
                  ? "bg-[#d0c3f1] text-[#0b6380] dark:bg-[#947dc2]/20 dark:text-[#947dc2]"
                  : "hover:bg-[#d0c3f1]/10 text-muted-foreground hover:text-foreground dark:hover:bg-[#947dc2]/10"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
