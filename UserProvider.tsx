import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { auth, db } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser);

      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const displayName = userDoc.data().displayName || "User";
            console.log("Firestore data:", userDoc.data());

            if (!user) {
              setUser({ ...currentUser, displayName } as User);
            }
          } else {
            console.warn("User document not found in Firestore.");
            if (!user) {
              setUser({ ...currentUser, displayName: currentUser.displayName || "User" } as User);
            }
          }

          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching Firestore data:", error);
          if (!user) {
            setUser({ ...currentUser, displayName: currentUser.displayName || "User" } as User);
          }
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ user, setUser, isAuthenticated, setIsAuthenticated, logout }),
    [user, isAuthenticated]
  );

  if (loading)
    return (
      <div className="loader-container">
        <img src="/loader.gif" alt="Loading..." />
      </div>
    );  

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
