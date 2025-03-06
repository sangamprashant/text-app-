import _env from "../config/env";
import { User, UserRole } from "../models/User";
import { initializeCourse } from "./initCourse";
import { initializeQuiz } from "./initializeQuiz ";
import { createUserWithRole } from "./initUser";

export const initializeAdmin = async () => {
  const existingAdmin = await User.findOne({ role: UserRole.ADMIN });
  if (!existingAdmin) {
    await User.create({
      name: _env.ADMIN_NAME,
      email: _env.ADMIN_EMAIL,
      password: _env.ADMIN_PASSWORD,
      role: UserRole.ADMIN,
    });
    console.log("Admin created...");
    // run to create a dummy data so that you can run the application
    const courseId: string = (await initializeCourse()).toString();
    // Create a teacher
    await createUserWithRole(UserRole.TEACHER, courseId);
    // Create a student
    await createUserWithRole(UserRole.STUDENT, courseId);
    // Create a sample quiz
    await initializeQuiz(courseId);
  }
};
