import { Response ,Request, NextFunction} from "express";

const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

/**
 * Middleware to verify JWT token
 */
const authenticateUser = (req:Request, res:Response, next:NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

/**
 * Middleware to check user role
 */
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied: Insufficient role" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRole };
