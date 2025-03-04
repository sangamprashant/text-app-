import React, { createContext, ReactNode, useContext, useState } from "react";

const quizDatadf = {
    _id: "quiz1",
    title: "JavaScript Basics",
    time: 15,
    questions: [
        {
            _id: "q1",
            question: "What is the output of `console.log(typeof null)`?",
            options: ["object", "null", "undefined", "number"],
            correctAnswer: "",
        },
        {
            _id: "q2",
            question: "Which keyword is used to declare a constant in JavaScript?",
            options: ["var", "let", "const", "static"],
            correctAnswer: "",
        },
        {
            _id: "q3",
            question: "What is the purpose of the `useEffect` hook?",
            options: [
                "Manage component state",
                "Perform side effects",
                "Render components",
                "Handle props",
            ],
            correctAnswer: "",
        },
        {
            _id: "q4",
            question: "What does `===` operator check in JavaScript?",
            options: [
                "Equality with type conversion",
                "Strict equality (no type conversion)",
                "Reference equality",
                "Assignment",
            ],
            correctAnswer: "",
        },
        {
            _id: "q5",
            question: "What is the purpose of the `map` function in JavaScript?",
            options: [
                "Transform an array",
                "Filter an array",
                "Sort an array",
                "Loop through an object",
            ],
            correctAnswer: "",
        },
        {
            _id: "q6",
            question:
                "Which lifecycle method is called after a component is mounted?",
            options: [
                "componentDidUpdate",
                "componentDidMount",
                "componentWillUnmount",
                "render",
            ],
            correctAnswer: "",
        },
        {
            _id: "q7",
            question: "What is a closure in JavaScript?",
            options: [
                "A function that has access to its own scope only",
                "A function that has access to the global scope",
                "A function that has access to its own scope, the outer function's scope, and the global scope",
                "A function that does not remember outer variables",
            ],
            correctAnswer: "",
        },
        {
            _id: "q8",
            question:
                "Which of the following is NOT a primitive data type in JavaScript?",
            options: ["Boolean", "String", "Object", "Number"],
            correctAnswer: "",
        },
        {
            _id: "q9",
            question: "What does the `setTimeout` function do?",
            options: [
                "Executes a function immediately",
                "Executes a function after a specified delay",
                "Creates a loop",
                "Stops the execution of a function",
            ],
            correctAnswer: "",
        },
        {
            _id: "q10",
            question:
                "Which statement correctly describes the `this` keyword in JavaScript?",
            options: [
                "`this` always refers to the global object",
                "`this` refers to the function in which it is used",
                "`this` refers to the object that calls the function",
                "`this` always refers to the window object",
            ],
            correctAnswer: "",
        },
        {
            _id: "q11",
            question: "What is the purpose of `localStorage` in JavaScript?",
            options: [
                "To store session-based data that expires when the tab is closed",
                "To store temporary data in the browser",
                "To store data persistently in the browser with no expiration",
                "To store large amounts of binary data",
            ],
            correctAnswer: "",
        },
        {
            _id: "q12",
            question:
                "Which event is triggered when a user clicks on an HTML element?",
            options: ["mouseover", "onclick", "keydown", "submit"],
            correctAnswer: "",
        },
        {
            _id: "q13",
            question: "What will `console.log(0 == false)` output?",
            options: ["true", "false", "undefined", "TypeError"],
            correctAnswer: "",
        },
        {
            _id: "q14",
            question: "Which function is used to parse a JSON string into an object?",
            options: [
                "JSON.parse()",
                "JSON.stringify()",
                "JSON.toObject()",
                "JSON.decode()",
            ],
            correctAnswer: "",
        },
        {
            _id: "q15",
            question: "What is the purpose of the `fetch()` API in JavaScript?",
            options: [
                "To fetch elements from the DOM",
                "To make HTTP requests",
                "To store data in localStorage",
                "To execute synchronous code",
            ],
            correctAnswer: "",
        },
    ],
};

interface AppContextType {
    quizActive: boolean;
    startQuiz: () => void;
    endQuiz: () => void;
    quizData: QuizData | null
    handleQuizData: (d: QuizData) => void
    ctx: {
        selectedQuestionIndex: number
        handleSelectedQuestion: (q: number) => void
    }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [quizActive, setQuizActive] = useState<boolean>(false);
    const [quizData, setQuizData] = useState<QuizData | null>(quizDatadf);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

    const startQuiz = () => setQuizActive(true);
    const endQuiz = () => setQuizActive(false);

    const handleQuizData = (d: QuizData) => {
        setQuizData(d)
    }

    const handleSelectedQuestion = (q: number) => {
        setSelectedQuestionIndex(q)
    }

    return (
        <AppContext.Provider value={{
            quizActive, startQuiz, endQuiz, quizData, handleQuizData, ctx: {
                selectedQuestionIndex, handleSelectedQuestion
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
