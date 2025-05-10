import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/task/TaskForm";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
  defaultValues?: any;
  title?: string;
  isEdit?: boolean;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  defaultValues,
  title = "Create New Task",
  isEdit = false,
}: TaskModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isEdit 
              ? "Update your task details below." 
              : "Fill in the details to create a new task."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <TaskForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
