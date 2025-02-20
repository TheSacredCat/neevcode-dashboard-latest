
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";
import { ChatWidget } from "./components/ChatWidget";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {!isAuthenticated ? (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            ) : (
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1">
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
                <ChatWidget />
              </div>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
