import { Request, Response } from "express";
import { User, UserRole } from "../models/User";
import { handleError, handleErrorMsg, successResponse } from "../utility";

/**
 * @desc    Create Teacher or Student
 * @route   POST /api/v1/admin/create/
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