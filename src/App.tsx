
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Subcategories from "./pages/Subcategories";
import SubSubcategories from "./pages/SubSubcategories";
import DesignersList from "./pages/DesignersList";
import DesignerProfile from "./pages/DesignerProfile";
import BookDesigner from "./pages/BookDesigner";
import AboutUs from "./pages/AboutUs";
import Trending from "./pages/Trending";
import NotFound from "./pages/NotFound";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/trending" element={<Trending />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/categories/:categoryId" element={<ProtectedRoute><Subcategories /></ProtectedRoute>} />
        <Route path="/categories/:categoryId/:subcategoryId" element={<ProtectedRoute><SubSubcategories /></ProtectedRoute>} />
        <Route path="/categories/:categoryId/:subcategoryId/:subSubcategoryId" element={<ProtectedRoute><DesignersList /></ProtectedRoute>} />
        <Route path="/designer/:designerId" element={<ProtectedRoute><DesignerProfile /></ProtectedRoute>} />
        <Route path="/book/:designerId" element={<ProtectedRoute><BookDesigner /></ProtectedRoute>} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
