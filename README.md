# TaskFlow - AI-Powered Task Management Application

TaskFlow is a full-stack web application that helps users manage their tasks with AI-powered summarization features. Built with React, Node.js, Express, MongoDB, and integrated with Groq LLM API for task summarization.

## Features

- User authentication (register, login, profile management)
- Create, read, update, and delete tasks
- Filter and search tasks by various criteria
- AI-powered task summarization using Groq LLM
- Responsive design for desktop and mobile

## Technology Stack

- **Frontend**: React, TailwindCSS, Shadcn UI, React Query
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **AI Integration**: Groq LLM API

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database (local or Atlas)
- Groq API key

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
```

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Access the application at http://localhost:5000

## API Documentation

### Authentication Endpoints

#### Register a New User
- **URL**: `/api/users/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "681f872fd541b9d889995f18",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
  ```

#### Login User
- **URL**: `/api/users/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "681f872fd541b9d889995f18",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
  ```

#### Get User Profile
- **URL**: `/api/users/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Response**:
  ```json
  {
    "_id": "681f872fd541b9d889995f18",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### Task Endpoints

#### Get All Tasks
- **URL**: `/api/tasks`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Query Parameters**: 
  - `priority`: Filter by priority (low, medium, high)
  - `dueDate`: Filter by due date
  - `search`: Search term
  - `page`: Page number for pagination
  - `limit`: Number of tasks per page
- **Response**:
  ```json
  {
    "tasks": [
      {
        "_id": "681f861e58d8aa758dd26360",
        "title": "Task Title",
        "description": "Task description here",
        "dueDate": "2023-06-30T00:00:00.000Z",
        "priority": "high",
        "userId": "681f85423ded0a2d72d83336",
        "summary": "AI-generated summary here",
        "createdAt": "2023-06-01T12:00:00.000Z",
        "updatedAt": "2023-06-01T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 5,
      "totalTasks": 1,
      "totalPages": 1
    }
  }
  ```

#### Get Task by ID
- **URL**: `/api/tasks/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Response**:
  ```json
  {
    "_id": "681f861e58d8aa758dd26360",
    "title": "Task Title",
    "description": "Task description here",
    "dueDate": "2023-06-30T00:00:00.000Z",
    "priority": "high",
    "userId": "681f85423ded0a2d72d83336",
    "summary": "AI-generated summary here",
    "createdAt": "2023-06-01T12:00:00.000Z",
    "updatedAt": "2023-06-01T12:00:00.000Z"
  }
  ```

#### Create Task
- **URL**: `/api/tasks`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task description here",
    "dueDate": "2023-06-30",
    "priority": "high"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "681f861e58d8aa758dd26360",
    "title": "Task Title",
    "description": "Task description here",
    "dueDate": "2023-06-30T00:00:00.000Z",
    "priority": "high",
    "userId": "681f85423ded0a2d72d83336",
    "createdAt": "2023-06-01T12:00:00.000Z",
    "updatedAt": "2023-06-01T12:00:00.000Z"
  }
  ```

#### Update Task
- **URL**: `/api/tasks/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated task description",
    "dueDate": "2023-07-15",
    "priority": "medium"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "681f861e58d8aa758dd26360",
    "title": "Updated Task Title",
    "description": "Updated task description",
    "dueDate": "2023-07-15T00:00:00.000Z",
    "priority": "medium",
    "userId": "681f85423ded0a2d72d83336",
    "summary": "AI-generated summary here",
    "createdAt": "2023-06-01T12:00:00.000Z",
    "updatedAt": "2023-06-01T12:30:00.000Z"
  }
  ```

#### Delete Task
- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Response**: `204 No Content`

#### Summarize Task
- **URL**: `/api/tasks/:id/summarize`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Response**:
  ```json
  {
    "taskId": "681f861e58d8aa758dd26360",
    "summary": "AI-generated summary of the task description"
  }
  ```

## Testing Instructions

### Running Backend Tests

```
npm run test:server
```

### Running Frontend Tests

```
npm run test:client
```

### Running E2E Tests

```
npm run test:e2e
```

## Design Decisions

### Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

- **Frontend**: Single-page application built with React and modern hooks (React Query for data fetching, React Hook Form for forms)
- **Backend**: RESTful API built with Express.js
- **Database**: MongoDB for flexible document storage
- **Authentication**: JWT-based token authentication for stateless authorization

### Project Structure

```
├── client/                # Frontend React application
│   ├── src/               
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and API clients
│   │   ├── pages/         # Application pages
│   │   └── App.tsx        # Main application component
├── server/                # Backend Express application
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Express middlewares
│   ├── models/            # MongoDB models
│   ├── services/          # Business logic services
│   └── index.ts           # Server entry point
└── shared/                # Shared code between frontend and backend
    └── schema.ts          # Shared validation schemas
```

### AI Integration

We chose Groq LLM API for task summarization for the following reasons:

1. **Performance**: Groq provides fast inference times, which is crucial for real-time summarization.
2. **Quality**: The model produces concise and relevant summaries of task descriptions.
3. **Cost-effectiveness**: Groq offers competitive pricing for API usage.
4. **Simple Integration**: The API is straightforward to integrate with our application.

The summarization feature helps users quickly understand the essence of long task descriptions, improving productivity and task management efficiency.

## Future Improvements

- Implement task categories and tags
- Add team collaboration features
- Integrate calendar view for task scheduling
- Implement task dependencies and subtasks
- Add more AI features like priority suggestions and deadline recommendations

## License

MIT