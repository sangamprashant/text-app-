enum UserRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
}

interface User {
  name: string;
  email: string;
  role: UserRole;
  course?: string;
}
