import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import _env from "../config/env";
import { IUser, User } from "../models/User";

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
 * @route   POST /api/auth/:type
 * @access  Public
 */

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { type } = req.params as { type: string }; // Ensure type is a string
    const { email, password } = req.body as { email: string; password: string };

    if (!["admin", "teacher", "student"].includes(type)) {
      return res.status(400).json({ message: "Invalid login type" });
    }

    // Find user by email
    const user: IUser | null = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check role from fetched user
    if (user.role !== type) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Validate password
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token: string = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      token,
      user: {
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
