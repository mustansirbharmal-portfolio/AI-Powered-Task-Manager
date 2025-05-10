import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { 
  CheckSquare, 
  PlusCircle, 
  User, 
  Info, 
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
  
  const navItems = [
    { 
      path: "/dashboard", 
      name: "Tasks Dashboard", 
      icon: <CheckSquare className="mr-3 h-5 w-5" /> 
    },
    { 
      path: "/tasks/create", 
      name: "Create Task", 
      icon: <PlusCircle className="mr-3 h-5 w-5" /> 
    },
    { 
      path: "/profile", 
      name: "Profile", 
      icon: <User className="mr-3 h-5 w-5" /> 
    },
    { 
      path: "/about", 
      name: "About", 
      icon: <Info className="mr-3 h-5 w-5" /> 
    }
  ];
  
  // Mobile sidebar
  const MobileSidebar = () => (
    <div className={`md:hidden ${isMobileSidebarOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 flex z-40">
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={closeMobileSidebar}
        ></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={closeMobileSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-2xl font-bold text-primary-600">TaskFlow</h1>
            </div>
            
            <nav className="mt-5 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMobileSidebar}
                >
                  <a
                    className={cn(
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                      location === item.path
                        ? "text-white bg-primary-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <span className="inline-block h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                    <svg
                      className="h-full w-full text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    {user?.name}
                  </p>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </div>
  );
  
  // Desktop sidebar
  const DesktopSidebar = () => (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-2xl font-bold text-primary-600">TaskFlow</h1>
            </div>
            
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      location === item.path
                        ? "text-white bg-primary-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <span className="inline-block h-9 w-9 rounded-full bg-gray-100 overflow-hidden">
                    <svg
                      className="h-full w-full text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {user?.name}
                  </p>
                  <button
                    onClick={logout}
                    className="flex items-center text-xs font-medium text-gray-500 group-hover:text-gray-700"
                  >
                    <LogOut className="mr-1 h-3 w-3" /> Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
}
