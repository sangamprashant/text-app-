import React, { createContext, ReactNode, useContext, useState } from "react";

interface AppContextType {
    quizActive: boolean;
    startQuiz: () => void;
    endQuiz: () => void;
    quizData: QuizData | null
    handleQuizData: (d: QuizData) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [quizActive, setQuizActive] = useState<boolean>(false);
    const [quizData, setQuizData] = useState<QuizData | null>(null);

    const startQuiz = () => setQuizActive(true);
    const endQuiz = () => setQuizActive(false);

    const handleQuizData = (d: QuizData) => {
        setQuizData(d)
    }

    return (
        <AppContext.Provider value={{ quizActive, startQuiz, endQuiz, quizData, handleQuizData }}>
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
