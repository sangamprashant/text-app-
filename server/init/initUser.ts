import { User, UserRole, IUser } from "../models/User";
import { Course } from "../models/Course";
import _env from "../config/env";

/**
 * Creates a user with a specific role and associates it with a course.
 * @param role - The role of the user (teacher or student).
 * @param courseId - The ObjectId of the course the user should be assigned to.
 */
export const createUserWithRole = async (role: UserRole, courseId: string) => {
  try {
    // Validate role
    if (![UserRole.TEACHER, UserRole.STUDENT].includes(role)) {
      throw new Error("Invalid role. Must be 'teacher' or 'student'.");
    }

    // Find the total count of existing users with the given role
    const count = await User.countDocuments({ role });

    // Generate a unique username (e.g., teacher1, student2)
    const userName = `${role}${count + 1}`;

    // Generate a unique email
    const email = `${userName.toLowerCase()}@quizly.com`;

    // Check if the provided courseId exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      throw new Error("Invalid courseId. No course found.");
    }

    // Create the new user
    const newUser: IUser = await User.create({
      name: userName,
      email,
      password: 1234,
      role,
      course: courseId,
    });

    console.log(`User created: ${newUser.name} (${newUser.email}) (1234)`);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
