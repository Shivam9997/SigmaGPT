import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateToken = async (req, res, next) => {
    try {
        // Get token from header or cookie
        const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key-change-in-production");
        
        // Get user from token
        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.status(401).json({ error: "Invalid token. User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Auth error:", error);
        res.status(401).json({ error: "Invalid token" });
    }
};
