import ProgressDemo from "./progress";
import TabButtons from "./tabs";
import TestList from "./tests";

const Home = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center py-20 pt-34 bg-orange-100 text-gray-900">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz App</h1>
                <p className="text-lg mb-6">Test your knowledge with fun and challenging quizzes!</p>
                <TabButtons />
                <ProgressDemo />
            </div>
            <TestList />
        </>
    );
};

export default Home