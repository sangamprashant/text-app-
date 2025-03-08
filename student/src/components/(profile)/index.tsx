import { Card, Table } from "antd";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAuth } from "../../(providers)/AuthContext";
import { apiRequest } from "../../utilities/api/apiRequest";
import headerToken from "../../utilities/api/headerToken";

// Define Types
type Student = {
    _id: string;
    name: string;
    email: string;
    course: Course;
};

type CompletedQuiz = {
    _id: string;
    title: string;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
};

type NotAttemptedQuiz = {
    _id: string;
    title: string;
    totalQuestions: number;
};

type StudentProfileData = {
    studentDetails: Student;
    completedQuizzes: CompletedQuiz[];
    notAttemptedQuizzes: NotAttemptedQuiz[];
};

const StudentProfile = () => {
    const { token, user } = useAuth();
    const [studentData, setStudentData] = useState<StudentProfileData | null>(null);

    useEffect(() => {
        if (token) {
            fetchStudentDetails();
        }
    }, [token, user?._id]);

    const fetchStudentDetails = async () => {
        if (!token) return;

        try {
            const res: { data: StudentProfileData } = await apiRequest(
                `/teacher/student-profile?student=${user?._id}`,
                "GET",
                undefined,
                headerToken(token)
            );
            setStudentData(res.data);
        } catch (error) {
            console.warn(error);
        }
    };

    // Columns for Ant Design Table
    const columns = [
        { title: "Quiz Title", dataIndex: "title", key: "title" },
        { title: "Total Questions", dataIndex: "totalQuestions", key: "totalQuestions" },
        { title: "Correct Answers", dataIndex: "correctAnswers", key: "correctAnswers" },
        { title: "Percentage", dataIndex: "percentage", key: "percentage", render: (value: number) => value ? `${value}%` : "N/A" },
    ];

    // Pie Chart Colors
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    // Total completed quizzes and pending quizzes
    const completedQuizzes = studentData?.completedQuizzes || [];
    const pendingQuizzes = studentData?.notAttemptedQuizzes || [];

    // Total number of quizzes
    const totalQuizzes = completedQuizzes.length + pendingQuizzes.length;

    // Sum of completed quiz percentages
    const totalCompletedPercentage = completedQuizzes.reduce((sum, quiz) => sum + quiz.percentage, 0);

    // Adjusted academic percentage considering pending quizzes as 0%
    const academicPercentage = totalQuizzes > 0
        ? (totalCompletedPercentage / totalQuizzes).toFixed(2)
        : "N/A";

    return (
        <div className="p-4 container mx-auto">
            {studentData && (
                <>
                    <Card title="Student Details" className="mb-4">
                        <p><strong>Name:</strong> {studentData.studentDetails.name}</p>
                        <p><strong>Email:</strong> {studentData.studentDetails.email}</p>
                        <p><strong>Course:</strong> {studentData.studentDetails.course.name}</p>
                        <p><strong>Academic Percentage:</strong> {academicPercentage}%</p>
                    </Card>

                    <Card title="Completed Quizzes" className="mb-4">
                        <Table columns={columns} dataSource={studentData.completedQuizzes} rowKey="_id" bordered />
                    </Card>

                    <Card title="Not Attempted Quizzes" className="mb-4">
                        {studentData.notAttemptedQuizzes.length > 0 ? (
                            <ul>
                                {studentData.notAttemptedQuizzes.map((quiz) => (
                                    <li key={quiz._id}>{quiz.title} ({quiz.totalQuestions} Questions)</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No pending quizzes!</p>
                        )}
                    </Card>

                    {studentData.completedQuizzes.length > 0 && (
                        <Card title="Quiz Performance Chart">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={studentData.completedQuizzes}
                                        dataKey="percentage"
                                        nameKey="title"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                    >
                                        {studentData.completedQuizzes.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    )}
                </>
            )}
        </div>
    );
};

export default StudentProfile;
