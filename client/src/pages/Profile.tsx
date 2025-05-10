import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { withAuth } from "@/lib/auth";
import { userApi } from "@/lib/api";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

function Profile() {
  const { toast } = useToast();
  
  const { data: user, isLoading, isError, refetch } = useQuery({
    queryKey: ["/api/users/me"],
    queryFn: () => userApi.getProfile(),
  });
  
  // Show error toast if profile fetch fails
  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Error loading profile",
        description: "Could not load your profile information. Please try again.",
      });
    }
  }, [isError, toast]);
  
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-4 w-[250px]" />
                  </div>
                ) : isError ? (
                  <div className="text-center py-4">
                    <p className="text-red-500">Error loading profile information.</p>
                    <button 
                      className="mt-2 text-primary-600 hover:text-primary-500"
                      onClick={() => refetch()}
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-medium text-gray-900">{user.name}</h3>
                        <p className="text-gray-500">User</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Email</h4>
                        <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Member Since</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {format(new Date(user.createdAt), "MMMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Profile);
