
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

export default function Login({ setIsAuthenticated }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "neevcode123") {
      toast.success("Login successful", {
        description: "Welcome back!",
        duration: 2000,
      });
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/");
    } else {
      toast.error("Login failed", {
        description: "Invalid credentials",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#d0c3f1]/10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#947dc2]">NeevCode</h1>
        <p className="text-center mt-2 text-muted-foreground">Learning Management System</p>
      </div>
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-[#0b6380]">
            Sign in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="border-[#d0c3f1]/50 focus:border-[#947dc2]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border-[#d0c3f1]/50 focus:border-[#947dc2]"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#947dc2] hover:bg-[#947dc2]/90"
            >
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="mt-4 text-sm text-muted-foreground">
        Demo credentials: admin / neevcode123
      </p>
    </div>
  );
}
