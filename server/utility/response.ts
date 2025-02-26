import { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  message = "Success"
): void => {
  res.json({ success: true, message, data });
};

export const handleError = (res: Response, error: unknown): void => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: "An unknown error occurred" });
  }
};

export const handleErrorMsg = (
  res: Response,
  status = 400,
  message = "Server error"
): void => {
  res.status(status).json({ message });
};
