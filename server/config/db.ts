import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mustansir:Mustang94885%23%23%23@task-management.xcbtvom.mongodb.net/');
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error occurred during database connection');
    }
    process.exit(1);
  }
};

export default connectDB;
