import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Task from '../models/taskModel';
import { asyncHandler } from '../middlewares/errorMiddleware';
import { insertTaskSchema, taskFilterSchema } from '@shared/schema';
import { generateTaskSummary } from '../services/groqService';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Validate input data
    const validatedData = insertTaskSchema.parse(req.body);
    
    // Create task
    const task = await Task.create({
      ...validatedData,
      userId: req.user._id,
    });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Get all tasks for the authenticated user
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  // Parse filters from query params
  const { priority, dueDate, search, page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  // Validate filters
  try {
    taskFilterSchema.parse({
      priority,
      dueDate,
      search,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined
    });
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
  
  // Build filter query
  const query: any = { userId: req.user._id };
  
  // Priority filter
  if (priority && priority !== 'all') {
    query.priority = priority;
  }
  
  // Due date filter
  if (dueDate && dueDate !== 'all') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    if (dueDate === 'today') {
      query.dueDate = { $gte: today, $lt: tomorrow };
    } else if (dueDate === 'this-week') {
      const endOfWeek = new Date(today);
      endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
      query.dueDate = { $gte: today, $lt: endOfWeek };
    } else if (dueDate === 'next-week') {
      const startOfNextWeek = new Date(today);
      startOfNextWeek.setDate(startOfNextWeek.getDate() + (7 - startOfNextWeek.getDay() + 1));
      const endOfNextWeek = new Date(startOfNextWeek);
      endOfNextWeek.setDate(endOfNextWeek.getDate() + 6);
      query.dueDate = { $gte: startOfNextWeek, $lt: endOfNextWeek };
    } else if (dueDate === 'overdue') {
      query.dueDate = { $lt: today };
    }
  }
  
  // Search filter
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Execute query with pagination
  const tasks = await Task.find(query)
    .sort({ dueDate: 1 })
    .skip(skip)
    .limit(Number(limit));
  
  // Get total count for pagination
  const total = await Task.countDocuments(query);
  
  res.json({
    tasks,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total
    }
  });
});

// @desc    Get a task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid task ID');
  }

  const task = await Task.findById(req.params.id);
  
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  
  // Check if task belongs to user
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this task');
  }
  
  res.json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid task ID');
  }

  // Validate input data
  try {
    insertTaskSchema.parse(req.body);
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
  
  const task = await Task.findById(req.params.id);
  
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  
  // Check if task belongs to user
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this task');
  }
  
  // Update task
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  
  res.json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid task ID');
  }

  const task = await Task.findById(req.params.id);
  
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  
  // Check if task belongs to user
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this task');
  }
  
  // Delete task
  await Task.findByIdAndDelete(req.params.id);
  
  res.json({ message: 'Task removed' });
});

// @desc    Generate task summary using AI
// @route   POST /api/tasks/:id/summarize
// @access  Private
export const summarizeTask = asyncHandler(async (req: Request, res: Response) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid task ID');
  }

  const task = await Task.findById(req.params.id);
  
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  
  // Check if task belongs to user
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this task');
  }
  
  // Check if task has a description
  if (!task.description) {
    res.status(400);
    throw new Error('Task must have a description to generate a summary');
  }
  
  // Generate summary using Groq API
  const summary = await generateTaskSummary(task.description);
  
  if (!summary) {
    res.status(500);
    throw new Error('Failed to generate summary');
  }
  
  // Update task with summary
  task.summary = summary;
  await task.save();
  
  res.json({
    taskId: task._id,
    summary
  });
});
