import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // 5 seconds timeout
})
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const createAdmin = async () => {
  try {
    console.log("Checking if admin already exists...");
    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin admin@gmail.com already exists in database. Updating password...");
      existingAdmin.password = "admin@1";
      await existingAdmin.save();
      console.log("Password updated successfully!");
      process.exit();
    }

    console.log("Creating new admin object...");
    const admin = new Admin({
      email: "admin@gmail.com",
      password: "admin@1",
    });

    console.log("Saving admin to database (this includes hashing the password)...");
    await admin.save();

    console.log("Admin created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

createAdmin();
