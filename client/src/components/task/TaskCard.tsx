import { useState } from "react";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { taskApi } from "@/lib/api";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import SummarizeLoadingModal from "@/components/modals/SummarizeLoadingModal";

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    summary?: string;
    createdAt: string;
  };
  onDelete?: () => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSummarizeModalOpen, setIsSummarizeModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  // Format dates
  const formattedCreatedDate = format(new Date(task.createdAt), "MMM dd, yyyy");
  const formattedDueDate = format(new Date(task.dueDate), "MMM dd, yyyy");
  
  // Delete task handler
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await taskApi.deleteTask(task._id);
      
      toast({
        title: "Task deleted",
        description: "The task has been successfully deleted.",
      });
      
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Could not delete task",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };
  
  // Summarize task handler
  const handleSummarize = async () => {
    if (!task.description) {
      toast({
        variant: "destructive",
        title: "Summarization failed",
        description: "Task must have a description to generate a summary.",
      });
      return;
    }
    
    try {
      setIsSummarizing(true);
      setIsSummarizeModalOpen(true);
      
      await taskApi.summarizeTask(task._id);
      
      toast({
        title: "Summary generated",
        description: "AI summary has been generated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Summarization failed",
        description: error instanceof Error ? error.message : "Could not generate summary",
      });
    } finally {
      setIsSummarizing(false);
      setIsSummarizeModalOpen(false);
    }
  };
  
  return (
    <>
      <Card className="mb-4 overflow-hidden">
        <CardHeader className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-start">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{task.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Created on {formattedCreatedDate}
            </p>
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Badge variant={task.priority as "high" | "medium" | "low"}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </Badge>
            <Badge variant="date">Due {formattedDueDate}</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="border-t border-gray-200 px-4 py-0 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {task.description || "No description provided."}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">AI Summary</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {task.summary ? (
                  task.summary
                ) : (
                  <span className="text-gray-400 italic">No summary generated yet</span>
                )}
              </dd>
            </div>
          </dl>
        </CardContent>
        
        <CardFooter className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="text-primary-700 bg-primary-100 hover:bg-primary-200 border-primary-200"
            onClick={handleSummarize}
          >
            <Bot className="h-4 w-4 mr-1.5" /> Summarize
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-indigo-700 bg-indigo-100 hover:bg-indigo-200 border-indigo-200"
            onClick={() => setLocation(`/tasks/edit/${task._id}`)}
          >
            <Edit className="h-4 w-4 mr-1.5" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-700 bg-red-100 hover:bg-red-200 border-red-200"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-1.5" /> Delete
          </Button>
        </CardFooter>
      </Card>
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      
      <SummarizeLoadingModal
        isOpen={isSummarizeModalOpen}
        onClose={() => setIsSummarizeModalOpen(false)}
      />
    </>
  );
}
