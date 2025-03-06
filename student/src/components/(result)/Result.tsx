import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../(providers)/AuthContext";
import { apiRequest } from "../../utilities/api/apiRequest";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Progress } from "antd";

export interface ResultInterface {
  _id: string;
  studentId: { _id: string; name: string; email: string };
  quizId: {
    _id: string;
    title: string;
    questions: { _id: string; question: string; options: string[]; correctAnswer: string }[];
  };
  courseId: string;
  completedAt: Date | null;
  answers: { questionId: string; selectedOption: string; isCorrect: boolean; _id: string }[];
  totalQuestions: number;
  correctAnswers: number;
  startedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Res {
  message: string;
  data: ResultInterface;
}

const COLORS = ["#22c55e", "#ef4444"];

const Result = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [result, setResult] = useState<ResultInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token && id) {
      fetchData();
    }
  }, [token, id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res: Res = await apiRequest(`/student.quiz/result/${id}`, "GET", undefined, {
        Authorization: `Bearer ${token}`,
      });

      setResult(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg pt-20">Loading results...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 pt-20">{error}</div>;
  }

  const data = [
    { name: "Correct", value: result?.correctAnswers || 0 },
    { name: "Incorrect", value: (result?.totalQuestions || 0) - (result?.correctAnswers || 0) }
  ];

  return (
    <div className="container mx-auto pt-20 px-4 max-w-4xl">
      <h2 className="text-4xl font-bold text-center mb-6 text-indigo-600">Quiz Result</h2>
      {result && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">{result.quizId.title}</h3>
          <p className="text-gray-600 mb-2">Total Questions: <span className="font-semibold">{result.totalQuestions}</span></p>
          <p className="text-green-600 mb-4">Correct Answers: <span className="font-semibold">{result.correctAnswers}</span></p>

          {/* Progress Bar */}
          <Progress
            percent={parseFloat(((result.correctAnswers / result.totalQuestions) * 100).toFixed(2))}
            status="active"
            showInfo={true}
          />

          {/* Pie Chart */}
          <div className="w-full flex justify-center mt-6">
            <ResponsiveContainer width="60%" height={300}>
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" label outerRadius={100} fill="#8884d8" dataKey="value">
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            {result.quizId.questions.map((question, index) => {
              const answer = result.answers.find(ans => ans.questionId === question._id);
              const isCorrect = answer?.isCorrect;

              return (
                <div key={question._id} className="border p-4 mb-4 rounded-lg shadow-md border-gray-400">
                  <p className="font-semibold text-lg">{index + 1}. {question.question}</p>
                  <div className="mt-2">
                    {question.options.map((option, i) => (
                      <div key={i} className={`p-2 rounded-lg mb-2 flex items-center gap-2 
                        ${answer?.selectedOption === option ? isCorrect ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800" : "bg-gray-100"}`}
                      >
                        {option}
                        {answer?.selectedOption === option && (
                          isCorrect ? <AiOutlineCheckCircle className="text-green-600" /> : <AiOutlineCloseCircle className="text-red-600" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-bold">Selected: {answer?.selectedOption || "No answer"}</p>
                  <p className="text-sm text-gray-500 font-bold">Correct Answer: {question.correctAnswer}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
