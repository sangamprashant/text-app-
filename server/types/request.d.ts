import { Request } from "express";
import { IUser } from "../models/User";

export interface RequestWithUser extends Request {
  user?: IUser; // ✅ Ensuring req.user is properly typed
}
