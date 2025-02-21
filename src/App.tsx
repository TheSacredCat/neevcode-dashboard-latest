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
import Teachers from "./pages/Teachers";
import Expenses from "./pages/Expenses";
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
          <Toaster position="top-right" />
          <Sonner position="top-right" className="!top-4 !right-4" />
          <BrowserRouter>
            {!isAuthenticated ? (
              <Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            ) : (
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1">
                  <Navbar setIsAuthenticated={setIsAuthenticated} />
                  <main className="p-6">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/teachers" element={<Teachers />} />
                      <Route path="/expenses" element={<Expenses />} />
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
