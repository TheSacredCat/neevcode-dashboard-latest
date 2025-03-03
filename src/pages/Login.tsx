import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

export default function Login({ setIsAuthenticated }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      toast.success("Login successful!", {
        description: "Welcome back!",
        duration: 2000, // ✅ Shorter success duration
        style: { background: "green", color: "white" }, // ✅ Green background
      });

      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/");
    } catch (error: any) {
      let errorMessage = "Login failed. Please check your credentials."; // Default message

      // Custom Firebase error handling
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Incorrect email or password.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Try again later.";
      }

      toast.error("Login failed!", {
        description: errorMessage,
        duration: 3000, // ✅ Error stays slightly longer
        style: { background: "red", color: "white" }, // ✅ Red background
      });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#faf9fe] fixed top-0 left-0">  
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
        Use your registered email & password.
      </p>
    </div>
  );
}
