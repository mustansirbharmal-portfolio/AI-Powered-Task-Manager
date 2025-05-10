import express, { Express } from 'express';
import { createServer, type Server } from 'http';
import connectDB from './config/db';
import { protect } from './middlewares/authMiddleware';
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import { registerUser, loginUser, getUserProfile } from './controllers/userController';
import { 
  createTask, 
  getTasks, 
  getTaskById, 
  updateTask, 
  deleteTask, 
  summarizeTask 
} from './controllers/taskController';

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB
  await connectDB();

  // API Routes
  // User Routes
  app.post('/api/users/register', registerUser);
  app.post('/api/users/login', loginUser);
  app.get('/api/users/me', protect, getUserProfile);

  // Task Routes
  app.post('/api/tasks', protect, createTask);
  app.get('/api/tasks', protect, getTasks);
  app.get('/api/tasks/:id', protect, getTaskById);
  app.put('/api/tasks/:id', protect, updateTask);
  app.delete('/api/tasks/:id', protect, deleteTask);
  app.post('/api/tasks/:id/summarize', protect, summarizeTask);

  // Do not add notFound middleware here
  // It will be added after Vite setup in index.ts
  app.use(errorHandler);

  const httpServer = createServer(app);

  return httpServer;
}
