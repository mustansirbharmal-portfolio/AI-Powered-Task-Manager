import { User } from '@shared/schema';
import mongoose from 'mongoose';
import UserModel from './models/userModel';
import TaskModel from './models/taskModel';

// Interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: Omit<User, '_id'>): Promise<User>;
  
  // Task methods will be added here as needed
}

// MongoDB implementation of storage
export class MongoStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | null> {
    try {
      const user = await UserModel.findById(id).select('-password');
      if (!user) return null;
      
      return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ email }).select('-password');
      if (!user) return null;
      
      return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  async createUser(user: Omit<User, '_id'>): Promise<User> {
    try {
      const newUser = await UserModel.create(user);
      
      return {
        _id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        password: '', // Don't return password
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const storage = new MongoStorage();
