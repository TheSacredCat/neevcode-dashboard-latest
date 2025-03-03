
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { 
  deleteUser, 
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const navigate = useNavigate();
  
  const handleDeleteAccount = async () => {
    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user && user.email) {
        // Re-authenticate before deleting account
        const credential = EmailAuthProvider.credential(
          user.email,
          password
        );
        await reauthenticateWithCredential(user, credential);
        
        // Delete the account
        await deleteUser(user);
        
        toast.success("Account deleted successfully");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      }
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        toast.error("Password is incorrect");
      } else {
        toast.error("Failed to delete account", {
          description: error.message,
        });
      }
    }
  };

  return (
    <div className="container max-w-3xl py-6 animate-in">
      <h1 className="text-3xl font-bold mb-6">Delete Account</h1>
      
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Once you delete your account, there is no going back. Please be certain.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Enter Your Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">
              Type "DELETE" to confirm
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                disabled={confirmText !== "DELETE" || !password}
              >
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}