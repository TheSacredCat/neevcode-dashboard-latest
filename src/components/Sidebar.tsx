
import { cn } from "@/lib/utils";
import { BookOpen, Home, Users, Menu, DollarSign } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Users, label: "Teachers", path: "/teachers" },
  { icon: DollarSign, label: "Expenses", path: "/expenses" },
];

const SidebarContent = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between border-b border-border">
        {!isCollapsed && <h2 className="text-xl font-bold text-[#947dc2]">NeevCode</h2>}
        {isCollapsed && <span className="w-6" />}
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
                  ? "bg-[#947dc2]/20 text-[#947dc2]"
                  : "text-muted-foreground hover:text-foreground hover:bg-[#947dc2]/10"
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
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  // Reset mobile sidebar state when switching between mobile and desktop
  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 fixed top-3 left-3 z-50 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent isCollapsed={false} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div 
          className={cn(
            "h-screen sticky top-0 flex",
            "bg-background dark:bg-card border-r border-border",
            isCollapsed ? "w-16" : "w-64",
            "transition-all duration-300"
          )}
        >
          <div className="flex flex-col flex-1">
            <SidebarContent isCollapsed={isCollapsed} />
            <div className="p-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mx-auto"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer div */}
      <div className={cn(
        "hidden md:block",
        isCollapsed ? "w-16" : "w-64",
        "shrink-0 transition-all duration-300"
      )} />
    </>
  );
}
