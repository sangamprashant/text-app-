import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../utilities/api/apiRequest";
import { useAuth } from "../../(providers)/AuthContext";
import { useAppContext } from "../../(providers)/AppContext";
import QuizDashboard from "./QuizOpen";

const Quiz = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const { quizActive, quizData, handleQuizData, startQuiz, endQuiz, ctx, mac } = useAppContext();
  const { handleQuizSubmission } = ctx
  const { time, setTime } = mac
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingQuiz(true);
        const response = await apiRequest(`/student.quiz/${id}`, "GET", undefined, {
          Authorization: `Bearer ${token}`,
        });
        handleQuizData(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setLoadingQuiz(false);
      }
    };

    endQuiz();
    if (id) fetchData();
  }, [id, token]);

  // Disable right-click
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    if (quizActive) document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, [quizActive]);

  // Disable keyboard shortcuts
  useEffect(() => {
    const disableKeyboard = (e: KeyboardEvent) => e.preventDefault();
    if (quizActive) {
      document.addEventListener("keydown", disableKeyboard);
      document.addEventListener("keypress", disableKeyboard);
    }
    return () => {
      document.removeEventListener("keydown", disableKeyboard);
      document.removeEventListener("keypress", disableKeyboard);
    };
  }, [quizActive]);

  // Prevent tab switching & minimize detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("You switched tabs! The quiz will be submitted.");
        handleQuizSubmission();
      }
    };

    const handleFocusLoss = () => {
      alert("Focus lost! Your quiz will be submitted.");
      handleQuizSubmission();
    };

    if (quizActive) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handleFocusLoss);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleFocusLoss);
    };
  }, [quizActive]);

  // Ensure full-screen mode remains active
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You exited full-screen! The quiz will be submitted.");
        handleQuizSubmission();
      }
    };

    if (quizActive) document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [quizActive]);

  // Start Quiz with Countdown Timer & Full-screen
  const handleStartQuiz = () => {
    setTimerActive(true);

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(console.error);
    }

    if (!quizActive) {
      const countdown = setInterval(() => {
        setTime((prev: number) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdown);
        startQuiz();

      }, 5000);
    }
  };

  if (loadingQuiz) return <div className="flex justify-center items-center min-h-36 py-20">Loading Quiz...</div>;
  if (error) return <div className="text-red-500 text-center mt-10 py-20">{error}</div>;
  if (!quizData) return <div className="text-gray-500 text-center mt-10 py-20">No quiz data found.</div>;

  if (quizActive) {
    return <QuizDashboard />;
  }

  return (
    <div className="container mx-auto flex justify-center items-center py-20">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg w-full border border-gray-200 my-20">
        <h1 className="text-3xl font-bold text-gray-800">{quizData.title}</h1>
        <p className="text-gray-600 mt-2 text-lg">⏳ {quizData.time} minutes</p>

        <div className="text-start mt-6">
          <h2 className="text-xl font-semibold">📜 Quiz Instructions:</h2>
          <ol className="list-decimal pl-5 mt-3 text-gray-700 space-y-2">
            <li>🔒 Quiz will start in full-screen mode.</li>
            <li>⛔ Keyboard shortcuts and right-click are disabled.</li>
            <li>🚫 Switching tabs or minimizing the window will auto-submit.</li>
            <li>⏳ Auto-submission will occur after time expires.</li>
          </ol>
        </div>
        <p className={`mt-4 text-green-700 ${timerActive ? "opacity-100" : "opacity-0"}`}>Quiz starts in {time > 0 ? time : 0} seconds</p>
        <button
          onClick={handleStartQuiz}
          className="mt-6 px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Quiz;