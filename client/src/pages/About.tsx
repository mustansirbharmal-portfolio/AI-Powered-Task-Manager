import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Brain, Shield, Code } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">About TaskFlow</h1>
          
          <div className="mt-6">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-xl text-center sm:text-left">
                  The AI-Powered Task Management System
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-6">
                  TaskFlow is a modern task management application designed to help you organize, prioritize, and track your tasks efficiently. With AI-powered summarization capabilities, you can quickly understand the essence of your tasks without reading lengthy descriptions.
                </p>
                
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Comprehensive Task Management</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Create, edit, delete, and organize tasks with ease. Set priorities, due dates, and detailed descriptions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Brain className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900">AI-Powered Summarization</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Generate concise summaries of your task descriptions automatically using Groq's large language model technology.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900">User Authentication</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Secure user registration and login system with password hashing and JWT token authentication.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Advanced Filtering & Sorting</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Filter tasks by priority, due date, and search terms. Sort your tasks to focus on what matters most.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Secure & Reliable</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Built with security best practices including encrypted passwords, protected routes, and secure API endpoints.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Code className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Modern Tech Stack</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Built with React, Express.js, Node.js, and MongoDB for a fast, reliable, and scalable experience.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">How TaskFlow Works</h2>
                  
                  <ol className="list-decimal list-inside space-y-3 text-gray-600 ml-2">
                    <li><span className="font-medium text-gray-900">Create an account</span> - Register with your name, email, and a secure password</li>
                    <li><span className="font-medium text-gray-900">Add your tasks</span> - Create tasks with titles, descriptions, priorities, and due dates</li>
                    <li><span className="font-medium text-gray-900">Generate summaries</span> - Use the AI-powered summarization to create concise versions of your task descriptions</li>
                    <li><span className="font-medium text-gray-900">Organize and filter</span> - Sort and filter your tasks to focus on what's important</li>
                    <li><span className="font-medium text-gray-900">Track progress</span> - Manage your tasks through completion</li>
                  </ol>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Technology</h2>
                  
                  <p className="text-gray-600 mb-4">
                    TaskFlow is built using a modern technology stack:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                    <li><span className="font-medium text-gray-900">Frontend:</span> React, TailwindCSS, Shadcn UI Components</li>
                    <li><span className="font-medium text-gray-900">Backend:</span> Node.js, Express.js</li>
                    <li><span className="font-medium text-gray-900">Database:</span> MongoDB</li>
                    <li><span className="font-medium text-gray-900">Authentication:</span> JWT tokens, bcrypt password hashing</li>
                    <li><span className="font-medium text-gray-900">AI Integration:</span> Groq LLM API</li>
                  </ul>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-8 text-center">
                  <p className="text-gray-600">
                    TaskFlow © {new Date().getFullYear()} | All Rights Reserved
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
