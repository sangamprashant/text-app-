import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../utilities/api/apiRequest";
import { useAuth } from "../../(providers)/AuthContext";
import { useAppContext } from "../../(providers)/AppContext";



const Quiz = () => {
  const { id } = useParams();
  const { token } = useAuth()
  const { quizActive, quizData, handleQuizData ,startQuiz,endQuiz} = useAppContext()
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingQuiz(true);
        const response = await apiRequest(`/student.quiz/${id}`, "GET", undefined, {
          Authorization: `Bearer ${token}`,
        })
        handleQuizData(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setLoadingQuiz(false);
      }
    };
    endQuiz()
    if (id)
      fetchData();
  }, [id, token]);

  if (loadingQuiz) {
    return <div className="flex justify-center items-center min-h-36 py-20 ">Loading Quiz...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10 py-20 ">{error}</div>;
  }

  if (!quizData) {
    return <div className="text-gray-500 text-center mt-10 py-20 ">No quiz data found.</div>;
  }

  if (quizActive) {
    return <QuizStart />
  }

  return (
    <div className="container mx-auto flex justify-center items-center min-h-96">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg w-full border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">{quizData.title}</h1>
        <p className="text-gray-600 mt-2 text-lg">⏳ {quizData.time} minutes</p>
        <button
          onClick={startQuiz}
          className="mt-6 px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Quiz;


const QuizStart = () => {
  const { quizData } = useAppContext()
  if (!quizData) return null
  return <>
    <div className="mt-5">
      {quizData.questions.map((q, index) => (
        <div key={q._id} className="mb-4 p-4 border rounded-lg shadow-md">
          <p className="font-semibold">{index + 1}. {q.question}</p>
          <ul className="list-disc pl-5">
            {q.options.map((option, i) => (
              <li key={i} className="mt-1">{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </>
}