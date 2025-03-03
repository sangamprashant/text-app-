import { ImFileText2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { useAuth } from "../../(providers)/AuthContext";
import { useEffect, useState } from "react";
import { apiRequest } from "../../utilities/api/apiRequest";

type Quiz = {
    _id: number;
    title: string;
    time: number;
    completed: boolean;
};

const TestList = () => {
    const { token } = useAuth()
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (token) fetchData()
    }, [token])

    const fetchData = async () => {
        try {
            const res = await apiRequest("/student.quiz", "GET", undefined, {
                Authorization: `Bearer ${token}`,
            })
            setQuizzes(res.data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="p-6 max-w-4xl mx-auto">
            {loading && <> loading Component and a spinner</>}
            {quizzes.map((q) => (
                <div
                    key={q._id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4"
                >
                    <div className="flex items-center gap-4">
                        <ImFileText2 className="text-8xl text-gray-700" />
                        <div>
                            <h3 className="font-semibold text-lg text-black">{q.title}</h3>
                            <p className="text-gray-600">Duration: {q.time} minutes</p>
                            {q.completed && (
                                <p className="text-orange-500 font-medium flex items-center">
                                    ✅ Completed
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to={`/${q.completed ? "result" : "quiz"}/${q._id}`} className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                            {q.completed ? "Result" : "Start"}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TestList;
