import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { withAuth } from "@/lib/auth";
import { taskApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import TaskForm from "@/components/task/TaskForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

function EditTask() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch task data
  const { 
    data: task, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: [`/api/tasks/${id}`],
    queryFn: () => taskApi.getTaskById(id || ""),
    enabled: !!id,
  });
  
  // Redirect if there's an error fetching the task
  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Error loading task",
        description: error instanceof Error ? error.message : "Task not found or you don't have permission to edit it",
      });
      setLocation("/dashboard");
    }
  }, [isError, error, setLocation, toast]);
  
  // Handle form submission
  const handleSubmit = async (data: any) => {
    if (!id) return;
    
    try {
      setIsSubmitting(true);
      await taskApi.updateTask(id, data);
      
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
      
      // Redirect to dashboard
      setLocation("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error instanceof Error ? error.message : "Could not update task",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocation("/dashboard")}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to dashboard</span>
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Task</h1>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="flex justify-end">
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                ) : task ? (
                  <TaskForm
                    defaultValues={{
                      title: task.title,
                      description: task.description,
                      dueDate: task.dueDate,
                      priority: task.priority,
                    }}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Task not found or you don't have permission to edit it.
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

export default withAuth(EditTask);
