import mongoose from 'mongoose';

export default class DB {
    private constructor() {}

    public static async connect() {
        const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/weathers";
    
        // Connecting to the database
        try {
          await mongoose.connect(MONGODB_URL);
          console.log("> Successfully connected to database.");
        } catch (error) {
          console.error("database connection failed. exiting now...");
          console.error(error);
          process.exit(1);
        }
      }
}
