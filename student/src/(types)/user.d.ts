enum UserRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
}

interface User {
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  course?: string;
}
