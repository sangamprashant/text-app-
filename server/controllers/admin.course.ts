import { Router } from "express";
import { Request, Response } from "express";
import { Course } from "../models/Course";
import { handleError, handleErrorMsg, successResponse } from "../utility";


/**
 * @desc    Fetch all courses
 * @route   GET /api/v1/courses
 * @access  Public
 */
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().sort({ name: 1 }); // Sort by name (optional)
    successResponse(res, courses, "Courses retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};


/**
 * @desc    Admin creates a new course
 * @route   POST /api/v1/courses
 * @access  Private (Admin only)
 */
export const adminCreateCourse = async (req: Request, res: Response) => {
  try {
    const { name, code } = req.body as { name: string; code: number };

    if (!name || !code) {
      return handleErrorMsg(res, 400, "Course name and code are required");
    }

    const existingCourse = await Course.findOne({ $or: [{ name }, { code }] });
    if (existingCourse) {
      return handleErrorMsg(res, 400, "Course name or code already exists");
    }

    const course = new Course({ name, code });
    await course.save();

    successResponse(res, course, "Course created successfully");
  } catch (error) {
    handleError(res, error);
  }
};


/**
 * @desc    Delete a course by ID
 * @route   DELETE /api/v1/courses/:id
 * @access  Private (Admin only)
 */
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return handleErrorMsg(res, 404, "Course not found");
    }
    await Course.findByIdAndDelete(id);
    successResponse(res, null, "Course deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};