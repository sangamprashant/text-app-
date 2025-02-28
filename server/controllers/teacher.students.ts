import { Response } from "express";
import { RequestWithUser } from "../types/request";
import { handleError, handleErrorMsg, successResponse } from "../utility";
import { IUser, User } from "../models/User";

export const getStudents = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) {
      return handleErrorMsg(res, 401, "Unauthorized: No user found");
    }

    const { course } = req.user;

    if (!course) {
      return handleErrorMsg(res, 400, "User is not assigned to any course");
    }

    const students: IUser[] = await User.find({ course, role: "student" })
      .select("-password -role -course")
      .lean();

    return successResponse(res, students, "Students retrieved successfully");
  } catch (error) {
    console.error("Error fetching students:", error);
    return handleError(res, error);
  }
};
