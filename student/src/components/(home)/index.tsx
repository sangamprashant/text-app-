import { useLayoutEffect, useState } from "react";
import StudentProfile from "../(profile)";
import { About, QuizlyInfo, Services } from "../../(page)";
import { useAuth } from "../../(providers)/AuthContext";
import ProgressDemo from "./progress";
import TabButtons from "./tabs";
import TestList from "./tests";

const Home = () => {
    const { user } = useAuth()
    const [tabOpen, setTabOpen] = useState(sessionStorage.getItem("tab") || "Overview")

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [completedCount, setCompletedCount] = useState({
        total: 0,
        done: 0
    })

    const handleCounts = (type: "total" | "done", val: number) => {
        setCompletedCount(pre => ({
            ...pre, [type]: val
        }))
    }

    const handleTabls = (s: string) => {
        sessionStorage.setItem("tab", s)
        setTabOpen(s)
    }

    const rendetComponent = () => {
        switch (tabOpen) {
            case "Overview": return <TestList handleCounts={handleCounts} />
            case "Profile": return <StudentProfile />
            default: <p className="text-center">No option contact developers </p>
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center text-center py-20 pt-36 bg-orange-100 text-gray-900">
                <h1 className="text-4xl font-bold mb-4">Welcome to the <span className="text-gray-500">QUIZLY</span></h1>
                <p className="text-lg mb-6">Test your knowledge with fun and challenging quizzes!</p>
                {user && <>
                    <TabButtons handleTabls={handleTabls} tabOpen={tabOpen} />
                    <ProgressDemo completedCount={completedCount} />
                </>}
            </div>
            {!user
                ?
                <>
                    <About />
                    <Services />
                    <QuizlyInfo />
                </>
                :
                <>
                    {rendetComponent()}
                </>
            }
        </>
    );
};

export default Home 