import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import _env from "../config/env";
import { IUser, User } from "../models/User";
import { handleError, handleErrorMsg, successResponse } from "../utility";
import { RequestWithUser } from "../types/request";

const JWT_SECRET = _env.JWT_SECRET;

// Define the User type
interface User {
  _id: string;
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
}

/**
 * @desc    Login user (Admin, Teacher, or Student)
 * @route   POST /api/v1/auth/:type
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.params as { type: string }; // Ensure type is a string
    const { email, password } = req.body as { email: string; password: string };

    if (!["admin", "teacher", "student"].includes(type)) {
      return handleErrorMsg(res, 400, "Invalid login type!");
    }

    // Find user by email
    const user: IUser | null = await User.findOne({ email }).lean();
    if (!user) {
      return handleErrorMsg(res, 400, "Invalid credentials!!");
    }

    // check role from fetched user
    if (user.role !== type) {
      return handleErrorMsg(res, 400, "Invalid credentials!!");
    }

    // Validate password
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return handleErrorMsg(res, 400, "Invalid credentials!!");
    }

    // Generate JWT token
    const token: string = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Remove sensitive data before sending response
    const { password: _, _id, ...userData } = user;
    successResponse(
      res,
      {
        token,
        user: userData,
      },
      "Login successful"
    );
  } catch (error) {
    console.error(error);
    handleError(res, error);
  }
};


/**
 * @desc    Get logged-in user's profile
 * @route   GET /api/v1/auth/me
 * @access  Authenticated
 */
export const getUserProfile = async (req: RequestWithUser, res: Response): Promise<void> => {
  if (!req.user) {
    return handleErrorMsg(res, 400, "User not found!");
  }
  successResponse(res, req.user, "User profile fetched successfully");
};

