import mongoose from 'mongoose';

interface ITask {
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  userId: mongoose.Types.ObjectId;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, 'Please add a due date'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    summary: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for faster queries
taskSchema.index({ userId: 1 });
taskSchema.index({ userId: 1, priority: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ title: 'text', description: 'text' });

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
