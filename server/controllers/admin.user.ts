import { Request, Response } from "express";
import { User, UserRole } from "../models/User";
import { handleError, handleErrorMsg, successResponse } from "../utility";

/**
 * @desc    Create Teacher or Student
 * @route   POST /api/v1/teacher-student/
 * @access  Admin Only (Handled by Middleware)
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, type, name, course } = req.body as {
      email: string;
      password: string;
      type: "teacher" | "student";
      name: string;
      course: string;
    };

    // Validate user type
    if (!Object.values(UserRole).includes(type as UserRole)) {
      return handleErrorMsg(res, 400, "Invalid user type.");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleErrorMsg(res, 400, "User already exists.");
    }

    // Prepare user data
    const newUserData: Partial<typeof User.prototype> = {
      name,
      email,
      password,
      course,
      role: type as UserRole,
    };

    const newUser = new User(newUserData);
    await newUser.save();

    successResponse(
      res,
      {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        course: newUser.course || null,
      },
      "User created successfully"
    );
  } catch (error) {
    console.error(error);
    handleError(res, error);
  }
};


/**
 * @desc    Get Teachers or Students
 * @route   GET /api/v1/teacher-student
 * @access  Admin Only (Handled by Middleware)
 */
export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const { type } = req.query as { type: "teacher" | "student" };

    // Validate user type
    if (!type || !Object.values(UserRole).includes(type as UserRole)) {
      return handleErrorMsg(res, 400, "Invalid or missing user type.");
    }

    // Fetch users by role
    const users = await User.find({ role: type }).select("-password").populate("course");

    successResponse(res, users, `${type.charAt(0).toUpperCase() + type.slice(1)}s retrieved successfully`);
  } catch (error) {
    console.error(error);
    handleError(res, error);
  }
};