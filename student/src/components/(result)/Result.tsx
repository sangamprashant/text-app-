import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../(providers)/AuthContext";
import { apiRequest } from "../../utilities/api/apiRequest";

export interface ResultInterface {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  quizId: {
    _id: string;
    title: string;
    questions: {
      _id: string;
      question: string;
      options: string[];
      correctAnswer: string;
    }[];
  };
  courseId: string;
  completedAt: Date | null;
  answers: {
    questionId: string;
    selectedOption: string;
    isCorrect: boolean;
    _id: string;
  }[];
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

const Result = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [result, setResult] = useState<ResultInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  return (
    <div className="container mx-auto pt-20">
      <h2 className="text-2xl font-semibold text-center mb-6">Quiz Result</h2>

      {result && (
        <div className="bg-white p-6">
          <h3 className="text-xl font-bold mb-2">{result.quizId.title}</h3>
          <p className="text-gray-600">Total Questions: {result.totalQuestions}</p>
          <p className="text-green-600">Correct Answers: {result.correctAnswers}</p>

          <div className="mt-4">
            {result.quizId.questions.map((question, index) => {
              const answer = result.answers.find(ans => ans.questionId === question._id);

              return (
                <div key={question._id} className="border p-4 mb-4 rounded-lg shadow-lg border-gray-400">
                  <p className="font-semibold text-lg">{index + 1}. {question.question}</p>

                  <div className="mt-2">
                    {question.options.map((option, i) => (
                      <div key={i} className={`p-2 rounded-lg mb-2 ${answer?.selectedOption === option
                        ? answer.isCorrect
                          ? "bg-green-200"
                          : "bg-red-200"
                        : "bg-gray-100"
                        }`}>
                        {option}
                      </div>
                    ))}
                  </div>

                  <p className="mt-2 text-sm">
                    <span className="font-bold">Selected:</span> {answer?.selectedOption || "No answer"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Correct Answer:</span> {question.correctAnswer}
                  </p>
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
