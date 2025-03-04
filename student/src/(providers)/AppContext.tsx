import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { apiRequest, errorMsg } from "../utilities/api/apiRequest";
import { useAuth } from "./AuthContext";
import { useNotificationContext } from "./NotificationContext";

interface AppContextType {
    quizActive: boolean;
    startQuiz: () => void;
    endQuiz: () => void;
    quizData: QuizData | null
    handleQuizData: (d: QuizData) => void
    ctx: {
        selectedQuestionIndex: number
        handleSelectedQuestion: (q: number) => void;
        handleAnswerSelection: (i: string, a: string) => void
        answers: AnswersTypes[]
        handleQuizSubmission: () => void
        handleRemoveAnswer: (i: string) => void
        handleSubmitButton: () => void
        formatTime: () => string
    }
    mac: {
        time: number;
        setTime: React.Dispatch<React.SetStateAction<number>>;
    }
}

interface AnswersTypes { questionId: string; selectedOption: string }

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { token } = useAuth()
    const { _notification } = useNotificationContext()
    const [quizActive, setQuizActive] = useState<boolean>(false);
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswersTypes[]>([])
    const [timeLeft, setTimeLeft] = useState(0);
    const [time, setTime] = useState<number>(5);

    const startQuiz = () => {
        setQuizActive(true)
        setTimeLeft((quizData?.time || 0) * 60)
    };
    const endQuiz = () => {
        setQuizActive(false)
        setTime(5)
    };

    const handleQuizData = (d: QuizData) => {
        setQuizData(d)
    }

    const handleSelectedQuestion = (q: number) => {
        setSelectedQuestionIndex(q)
    }

    const handleQuizSubmission = async () => {

        try {
            const response: { data: { message: string; data: QuizData } } = await apiRequest("/student.quiz", "POST", { answers, quizId: quizData?._id }, {
                // Authorization: `Bearer ${token}`,
            })

            _notification.Success("Quiz Submitted", response.data.message);

            endQuiz();
            if (document.exitFullscreen) document.exitFullscreen();

        } catch (error) {
            _notification.Error("Submission Failed", errorMsg(error) || "An error occurred while submitting the quiz.");
        }

    };

    const handleAnswerSelection = (questionId: string, selectedOption: string) => {
        setAnswers((prevAnswers) => {
            const existingAnswerIndex = prevAnswers.findIndex((i) => i.questionId === questionId);

            if (existingAnswerIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[existingAnswerIndex] = { questionId, selectedOption };
                return updatedAnswers;
            } else {
                return [...prevAnswers, { questionId, selectedOption }];
            }
        });
    };

    const handleRemoveAnswer = (id: string) => {
        setAnswers(prev => prev.filter(d => d.questionId !== id));
    };

    const handleSubmitButton = () => {
        handleQuizSubmission()
    }

    useEffect(() => {
        if (timeLeft <= 0) {
            handleQuizSubmission(); // Automatically submit when time reaches 0
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = () => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
    };

    return (
        <AppContext.Provider value={{
            quizActive, startQuiz, endQuiz, quizData, handleQuizData, ctx: {
                selectedQuestionIndex, handleSelectedQuestion, handleAnswerSelection, answers, handleQuizSubmission, handleRemoveAnswer, handleSubmitButton, formatTime
            },
            mac: {
                time, setTime
            }
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
