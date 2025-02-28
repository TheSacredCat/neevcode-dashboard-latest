
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Router>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar setIsAuthenticated={setIsAuthenticated} />
                <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/content" element={<ContentManagement />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </Router>
          <CustomToastProvider />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
