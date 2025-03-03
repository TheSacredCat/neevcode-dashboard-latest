import { cn } from "@/lib/utils";
import { BookOpen, Home, Users, Menu, DollarSign, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Users, label: "Teachers", path: "/teachers" },
  { icon: DollarSign, label: "Expenses", path: "/expenses" },
  { icon: Settings, label: "Content Management", path: "/content" },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  const MenuItem = ({ item, isCollapsed }: { item: typeof menuItems[0], isCollapsed: boolean }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    const content = (
      <Link
        to={item.path}
        className={cn(
          "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors my-1",
          isActive
            ? "bg-[#947dc2]/20 text-[#947dc2]"
            : "text-muted-foreground hover:text-foreground hover:bg-[#947dc2]/10"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span>{isMobile || !isCollapsed ? item.label : ""}</span>
      </Link>
    );

    if (isCollapsed && !isMobile) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-1">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  const sidebarContent = (
    <>
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center">
          <img src="/nc.png" alt="NeevCode Logo" className="h-8" />
        </div>
        {/* Hamburger menu is removed for desktop mode */}
      </div>
      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <MenuItem key={item.path} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Hamburger menu for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-3 left-4 z-50 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        {/* Mobile sidebar */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="p-0 w-72">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <>
      <div 
        className={cn(
          "fixed left-0 top-0 z-20 h-screen flex flex-col transition-all duration-300",
          "bg-background dark:bg-card border-r border-border",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </div>
      {/* Spacer div to prevent content from going under the sidebar */}
      <div className={cn(
        "hidden md:block",
        isCollapsed ? "w-16" : "w-64",
        "shrink-0 transition-all duration-300"
      )} />
    </>
  );
}