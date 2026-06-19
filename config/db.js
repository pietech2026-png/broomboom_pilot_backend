import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        console.log("Using cached MongoDB connection");
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        console.log("Creating new MongoDB connection promise...");
        cached.promise = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/broomboom_pilot', opts)
            .then((mongooseInstance) => {
                console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
                return mongooseInstance;
            })
            .catch((error) => {
                console.error(`MongoDB Connection Error: ${error.message}`);
                cached.promise = null;
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

export default connectDB;
