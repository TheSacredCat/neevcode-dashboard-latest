import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Teachers from "./pages/Teachers";
import Expenses from "./pages/Expenses";
import ContentManagement from "./pages/ContentManagement";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { CustomToastProvider } from "./components/CustomToastProvider";

const queryClient = new QueryClient();

function ProtectedRoute({ element }: { element: JSX.Element }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function AppLayout({ isAuthenticated, setIsAuthenticated }: { isAuthenticated: boolean; setIsAuthenticated: (value: boolean) => void }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Prevent logged-in users from accessing the login page
  if (isAuthenticated && isLoginPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen">
      {!isLoginPage && <Sidebar />}
      <div className="flex flex-col flex-1 overflow-hidden">
        {!isLoginPage && <Navbar setIsAuthenticated={setIsAuthenticated} />}
        <main className="flex-1 overflow-y-auto pt-20 pb-6 px-6 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={<ProtectedRoute element={<Index />} />} />
            <Route path="/courses" element={<ProtectedRoute element={<Courses />} />} />
            <Route path="/teachers" element={<ProtectedRoute element={<Teachers />} />} />
            <Route path="/expenses" element={<ProtectedRoute element={<Expenses />} />} />
            <Route path="/content" element={<ProtectedRoute element={<ContentManagement />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Router>
            <AppLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          </Router>
          <CustomToastProvider />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
