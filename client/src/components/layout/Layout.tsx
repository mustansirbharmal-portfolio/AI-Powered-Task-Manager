import { ReactNode } from "react";
import { useLocation } from "wouter";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "@/lib/auth";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();
  const [location] = useLocation();
  
  // Check if we're on a public page
  const isPublicPage = ["/", "/login", "/register", "/about"].includes(location);
  
  // If not authenticated and not on a public page, don't render the layout (redirect is handled by withAuth)
  if (!isAuthenticated && !isPublicPage) {
    return null;
  }
  
  // For public pages, don't show sidebar and header
  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
