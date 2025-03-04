import { useAppContext } from "../../(providers)/AppContext";
import QuizOpenControls from "./(open)/QuizOpen.Controls";
import QuizOpenGuide from "./(open)/QuizOpen.Guide";
import QuizOpenHeader from "./(open)/QuizOpen.Header";
import QuizOpenList from "./(open)/QuizOpen.List";
import QuizOpenQuestion from "./(open)/QuizOpen.Question";

const QuizDashboard = () => {
    const { quizData, } = useAppContext()
    if (!quizData) return;

    return (
        <div className="w-screen h-screen bg-gray-100 flex flex-col p-4 fixed">
            <QuizOpenHeader />
            <div className="flex-1 flex gap-4 mt-4">
                <div className="w-1/3 bg-white shadow px-4 pb-4 overflow-y-auto max-h-[85vh]">
                    <div className="sticky top-0 bg-white pb-2">
                        <h2 className="text-lg font-semibold mb-3">{quizData?.title}</h2>
                        <QuizOpenGuide />
                    </div>
                    <QuizOpenList />
                </div>

                <div className="w-2/3 bg-white shadow p-4 max-h-[85vh] flex flex-col justify-between">
                    <div className="overflow-y-auto h-[73vh]">
                        <QuizOpenQuestion />
                    </div>
                    <QuizOpenControls />
                </div>
            </div>
        </div>
    );
};

export default QuizDashboard;
