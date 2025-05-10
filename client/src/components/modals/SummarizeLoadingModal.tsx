import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";

interface SummarizeLoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SummarizeLoadingModal({
  isOpen,
  onClose,
}: SummarizeLoadingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
            <Bot className="h-6 w-6 text-primary-600" />
          </div>
          <DialogTitle className="text-center mt-4">Generating Summary</DialogTitle>
          <DialogDescription className="text-center">
            Our AI is analyzing your task and creating a concise summary. This may take a few moments...
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
