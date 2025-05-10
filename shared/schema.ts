import { z } from 'zod';

// User schema
export const userSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const loginSchema = userSchema.pick({
  email: true,
  password: true
});

export const registerSchema = userSchema.pick({
  name: true,
  email: true,
  password: true
});

// Task schema
export const taskSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  dueDate: z.string().transform((val) => new Date(val)),
  priority: z.enum(["low", "medium", "high"]),
  userId: z.string(),
  summary: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const insertTaskSchema = taskSchema.omit({ 
  _id: true,
  userId: true,
  summary: true,
  createdAt: true,
  updatedAt: true
});

export const taskFilterSchema = z.object({
  priority: z.enum(["all", "low", "medium", "high"]).optional(),
  dueDate: z.enum(["all", "today", "this-week", "next-week", "overdue"]).optional(),
  search: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional()
});

// Types
export type User = z.infer<typeof userSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type RegisterUser = z.infer<typeof registerSchema>;
export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type TaskFilter = z.infer<typeof taskFilterSchema>;
