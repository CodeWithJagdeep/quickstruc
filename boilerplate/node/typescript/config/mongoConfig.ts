import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

const mongoConfig = {
  url: DATABASE_URL || "mongodb://localhost:27017/mydatabase",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(mongoConfig.url, mongoConfig.options);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error: any) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export { connectDB };
