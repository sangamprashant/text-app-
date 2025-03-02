import { useLayoutEffect } from "react";
import { About, QuizlyInfo, Services } from "../../(page)";
import { useAuth } from "../../(providers)/AuthContext";
import ProgressDemo from "./progress";
import TabButtons from "./tabs";
import TestList from "./tests";

const Home = () => {
    const { user } = useAuth()
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center py-20 pt-36 bg-orange-100 text-gray-900">
                <h1 className="text-4xl font-bold mb-4">Welcome to the <span className="text-gray-500">QUIZLY</span></h1>
                <p className="text-lg mb-6">Test your knowledge with fun and challenging quizzes!</p>
                {user && <>
                    <TabButtons />
                    <ProgressDemo />
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
                    <TestList />
                </>
            }
        </>
    );
};

export default Home