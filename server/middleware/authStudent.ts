import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../types/request";
import _env from "../config/env";
import { IUser, User } from "../models/User";
import { handleErrorMsg } from "../utility";

export const authStudent = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return handleErrorMsg(res, 401, "No token, authorization denied!");
    }

    const decoded: any = jwt.verify(token, _env.JWT_SECRET as string);
    const user: IUser | null = await User.findById(decoded.id).select("-password");

    if (!user) {
      return handleErrorMsg(res, 404, "User not found!");
    }

    if (user.role !== "student") {
      return handleErrorMsg(res, 401, "Only students can perform this action, authorization denied!");
    }

    (req as RequestWithUser).user = user;
    next();
  } catch (error) {
    return handleErrorMsg(res, 401, "Invalid token!");
  }
};
