import { queryClient, apiRequest } from "./queryClient";
import { Task, InsertTask } from "@shared/schema";

// Task API functions
export const taskApi = {
  // Get all tasks with optional filters
  async getTasks(filters?: {
    priority?: string;
    dueDate?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.priority) queryParams.append("priority", filters.priority);
      if (filters.dueDate) queryParams.append("dueDate", filters.dueDate);
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
    }
    
    const url = `/api/tasks${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await apiRequest("GET", url);
    return response.json();
  },
  
  // Get task by ID
  async getTaskById(id: string) {
    const response = await apiRequest("GET", `/api/tasks/${id}`);
    return response.json();
  },
  
  // Create a new task
  async createTask(taskData: InsertTask) {
    const response = await apiRequest("POST", "/api/tasks", taskData);
    const newTask = await response.json();
    
    // Invalidate tasks cache to refresh list
    queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    
    return newTask;
  },
  
  // Update a task
  async updateTask(id: string, taskData: Partial<InsertTask>) {
    const response = await apiRequest("PUT", `/api/tasks/${id}`, taskData);
    const updatedTask = await response.json();
    
    // Invalidate both tasks list and the specific task
    queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    queryClient.invalidateQueries({ queryKey: [`/api/tasks/${id}`] });
    
    return updatedTask;
  },
  
  // Delete a task
  async deleteTask(id: string) {
    await apiRequest("DELETE", `/api/tasks/${id}`);
    
    // Invalidate tasks cache to refresh list
    queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
  },
  
  // Generate AI summary for a task
  async summarizeTask(id: string) {
    const response = await apiRequest("POST", `/api/tasks/${id}/summarize`);
    const summaryData = await response.json();
    
    // Invalidate both tasks list and the specific task to show updated summary
    queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    queryClient.invalidateQueries({ queryKey: [`/api/tasks/${id}`] });
    
    return summaryData;
  },
};

// User API functions
export const userApi = {
  // Get current user profile
  async getProfile() {
    const response = await apiRequest("GET", "/api/users/me");
    return response.json();
  },
};
