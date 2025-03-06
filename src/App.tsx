
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Teachers from "./pages/Teachers";
import Expenses from "./pages/Expenses";
import ContentManagement from "./pages/ContentManagement";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
// import DeleteAccount from "./pages/DeleteAccount";
import { CustomToastProvider } from "./components/CustomToastProvider";
import { UserProvider, useUser } from "../UserProvider"; // ✅ Corrected path

const queryClient = new QueryClient();

function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function AppLayout() {
  const { isAuthenticated, setIsAuthenticated } = useUser();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isAuthenticated && isLoginPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen">
      {!isLoginPage && <Sidebar />}
      <div className="flex flex-col flex-1 overflow-hidden">
        {!isLoginPage && <Navbar setIsAuthenticated={setIsAuthenticated} />} 
        <main className={`flex-1 overflow-y-auto pb-6 ${isLoginPage ? 'pt-0' : 'pt-20'} px-6 max-w-7xl mx-auto w-full`}>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={<ProtectedRoute element={<Index />} />} />
            <Route path="/courses" element={<ProtectedRoute element={<Courses />} />} />
            <Route path="/teachers" element={<ProtectedRoute element={<Teachers />} />} />
            <Route path="/messages" element={<ProtectedRoute element={<Messages />} />} />
            <Route path="/expenses" element={<ProtectedRoute element={<Expenses />} />} />
            <Route path="/content" element={<ProtectedRoute element={<ContentManagement />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/security" element={<ProtectedRoute element={<Security />} />} />
            {/* <Route path="/delete-account" element={<ProtectedRoute element={<DeleteAccount />} />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Router>
              <AppLayout />
            </Router>
            <CustomToastProvider />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
