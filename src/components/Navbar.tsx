
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, LogOut, Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";
import { auth } from "@/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

interface NavbarProps {
  setIsAuthenticated: (value: boolean) => void;
}

export function Navbar({ setIsAuthenticated }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  // State to hold user data
  const [user, setUser] = useState<{ name: string | null; email: string | null }>({
    name: null,
    email: null,
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "User", // If display name is null, fallback to "User"
          email: currentUser.email || "No Email",
        });
      } else {
        setUser({ name: null, email: null });
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      toast.success("Logged out successfully", {
        description: "See you again soon!",
        duration: 2000,
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      if (error.message.includes("Function not implemented")) {
        toast.success("Logged out successfully", { duration: 2000 });
        navigate("/login");
      } else {
        toast.error("Logout failed", {
          description: error.message,
          duration: 2000,
        });
      }
    }
  };
  

  return (
    <div className="h-16 border-b bg-card px-6 flex items-center justify-between fixed top-0 right-0 left-0 z-30 md:left-16">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search anything..." className="pl-8 w-full max-w-md bg-muted" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full transform translate-x-1/2 -translate-y-1/2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-4">
              <p className="text-sm text-muted-foreground">No new notifications</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-black dark:text-white">
                  {user.name ? user.name.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email || "No Email"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
