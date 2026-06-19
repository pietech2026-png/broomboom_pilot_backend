import connectDB from '../config/db.js';

const dbMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection middleware error:", error);
        res.status(500).json({
            message: "Database connection failed",
            error: error.message
        });
    }
};

export default dbMiddleware;
