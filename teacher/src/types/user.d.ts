export enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student",
}

export interface User {
    name: string;
    email: string;
    role: UserRole;
    course?: string
}