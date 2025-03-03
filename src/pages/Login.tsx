import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // ✅ Ensure Firebase auth is correctly imported
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

export default function Login({ setIsAuthenticated }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // ✅ Ensure Firebase Auth is initialized
      if (!auth) {
        throw new Error("Firebase Auth is not initialized.");
      }
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      // ✅ Ensure user exists
      if (!userCredential.user) {
        throw new Error("User authentication failed.");
      }
  
      // ✅ Success Toast (Green)
      toast.success("Login successful!", {
        description: "Welcome back!",
        duration: 2000,
        style: { background: "green", color: "white" },
      });
  
      // ✅ Store authentication & navigate
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/");
  
      return; // ✅ Prevents the catch block from running
    } catch (error: any) {
      console.error("Login Error:", error); // ✅ Debugging log
  
      let errorMessage = "Login failed. Please check your credentials.";
  
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Incorrect email or password.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Try again later.";
      }
  
      // ✅ Error Toast (Red)
      toast.error("Login failed!", {
        description: errorMessage,
        duration: 3000,
        style: { background: "red", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#faf9fe] dark:bg-[#18181b] fixed top-0 left-0">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#947dc2] dark:text-[#d0c3f1]">NeevCode</h1>
        <p className="text-center mt-2 text-muted-foreground dark:text-gray-400">
          Learning Management System
        </p>
      </div>
      <Card className="w-[350px] shadow-lg bg-white dark:bg-[#1f1f22] dark:text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-[#0b6380] dark:text-[#d0c3f1]">
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
                className="border-[#d0c3f1]/50 focus:border-[#947dc2] dark:border-gray-600 dark:focus:border-gray-400"
                required
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border-[#d0c3f1]/50 focus:border-[#947dc2] dark:border-gray-600 dark:focus:border-gray-400 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#947dc2] hover:bg-[#947dc2]/90 dark:bg-[#d0c3f1] dark:hover:bg-[#b1b3dd]"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="mt-4 text-sm text-muted-foreground dark:text-gray-400">
        Use your registered email & password.
      </p>
    </div>
  );
}
