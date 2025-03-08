import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthenticationContext";
import { useNotificationContext } from "./NotificationContext";
import { apiRequest, errorMsg } from "../utilities/apis/apiRequest";

interface CoursesListContextType {
    courses: Course[];
    loading: boolean;
    fetchCourses: () => void;
    addCourse: (course: Course) => void;
    deleteCourse: (id: string) => void;
}

const CoursesListContext = createContext<CoursesListContextType | undefined>(undefined);

export const CoursesListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token, user } = useAuth();
    const { _notification } = useNotificationContext();

    // Fetch courses
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await apiRequest("/courses", "GET", undefined, {
                Authorization: `Bearer ${token}`,
            });
            setCourses(response.data);
        } catch (error: unknown) {
            console.error("Error fetching courses:", error);
            _notification.Error("Error", errorMsg(error));
        } finally {
            setLoading(false);
        }
    };

    // Add course
    const addCourse = (course: Course) => {
        setCourses((prevCourses) => [course, ...prevCourses]);
    };

    // Delete course
    const deleteCourse = async (id: string) => {
        try {
            await apiRequest(`/courses/${id}`, "DELETE", undefined, {
                Authorization: `Bearer ${token}`,
            });
            setCourses((prev) => prev.filter(course => course._id !== id));
            _notification.Success("Deleted", "Course removed successfully.");
        } catch (error: unknown) {
            console.error("Error deleting course:", error);
            _notification.Error("Error", errorMsg(error));
        }
    };

    useEffect(() => {
        if (user?.role === "admin")
            fetchCourses();
    }, [token, user]);

    return (
        <CoursesListContext.Provider value={{ courses, loading, fetchCourses, addCourse, deleteCourse }}>
            {children}
        </CoursesListContext.Provider>
    );
};

export const useCoursesList = () => {
    const context = useContext(CoursesListContext);
    if (!context) {
        throw new Error("useCoursesList must be used within a CoursesListProvider");
    }
    return context;
};
