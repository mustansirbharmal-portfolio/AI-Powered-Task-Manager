import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { taskApi } from "@/lib/api";
import SummarizeLoadingModal from "@/components/modals/SummarizeLoadingModal";

interface TaskSummarizeButtonProps {
  taskId: string;
  hasDescription: boolean;
  onSummarizeSuccess?: () => void;
}

export default function TaskSummarizeButton({ 
  taskId, 
  hasDescription, 
  onSummarizeSuccess 
}: TaskSummarizeButtonProps) {
  const { toast } = useToast();
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSummarize = async () => {
    if (!hasDescription) {
      toast({
        variant: "destructive",
        title: "Summarization failed",
        description: "Task must have a description to generate a summary.",
      });
      return;
    }
    
    try {
      setIsSummarizing(true);
      setIsModalOpen(true);
      
      await taskApi.summarizeTask(taskId);
      
      toast({
        title: "Summary generated",
        description: "AI summary has been generated successfully.",
      });
      
      if (onSummarizeSuccess) {
        onSummarizeSuccess();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Summarization failed",
        description: error instanceof Error ? error.message : "Could not generate summary",
      });
    } finally {
      setIsSummarizing(false);
      setIsModalOpen(false);
    }
  };
  
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={isSummarizing || !hasDescription}
        className="text-primary-700 bg-primary-100 hover:bg-primary-200 border-primary-200"
        onClick={handleSummarize}
      >
        <Bot className="h-4 w-4 mr-1.5" /> 
        {isSummarizing ? "Generating..." : "Summarize"}
      </Button>
      
      <SummarizeLoadingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
