
import { cn } from "@/lib/utils";
import { BookOpen, Home, Users, Bell, PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Users, label: "Teachers", path: "/teachers" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-64 bg-card border-r flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">NeevCode</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
      </nav>
    </div>
  );
}
