"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "../../UserProvider";

export default function Profile() {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [originalUsername, setOriginalUsername] = useState(user?.displayName || ""); // To track changes

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || "");
      setEmail(user.email || "");
      setOriginalUsername(user.displayName || ""); // Set initial username
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty", { duration: 1500 });
      return;
    }

    if (username === originalUsername) {
      toast.info("No changes made!", { duration: 1500 });
      return;
    }

    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        // ✅ Update Firebase Authentication profile
        await updateProfile(currentUser, { displayName: username });

        // ✅ Update Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, { displayName: username, email: currentUser.email }, { merge: true });

        // ✅ Fetch updated user data from Firestore to ensure consistency
        const updatedDoc = await getDoc(userDocRef);
        if (updatedDoc.exists()) {
          const updatedUser = updatedDoc.data();
          setUser((prevUser) => (prevUser ? { ...prevUser, displayName: updatedUser.displayName } : null));
          setOriginalUsername(updatedUser.displayName); // Reset tracking state
        }

        toast.success("Profile updated successfully!", {
          duration: 1500,
          style: { backgroundColor: "green", color: "white" },
        });
      }
    } catch (error: any) {
      toast.error("Failed to update profile", {
        description: error.message,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-6 animate-in">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>Update your personal information here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              disabled
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-sm text-muted-foreground">Your email cannot be changed.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateProfile} disabled={loading || username === originalUsername} className="bg-[#947dc2] hover:bg-[#947dc2]/90 dark:bg-[#d0c3f1] dark:hover:bg-[#b1b3dd]">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
