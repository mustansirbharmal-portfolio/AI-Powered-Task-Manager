import { useState } from "react";
import { useLocation } from "wouter";
import { withAuth } from "@/lib/auth";
import { taskApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import TaskForm from "@/components/task/TaskForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

function CreateTask() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await taskApi.createTask(data);
      
      toast({
        title: "Task created",
        description: "Your task has been created successfully.",
      });
      
      // Redirect to dashboard
      setLocation("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Create failed",
        description: error instanceof Error ? error.message : "Could not create task",
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
            <h1 className="text-2xl font-semibold text-gray-900">Create New Task</h1>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskForm
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(CreateTask);
