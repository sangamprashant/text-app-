import { useAppContext } from '../../../(providers)/AppContext';

const QuizOpenHeader = () => {
    const { quizData } = useAppContext()
    if (!quizData) return;
    return (
        <div className="bg-white shadow-md p-4 text-lg font-bold flex justify-between items-center">
            <p>{quizData.time}</p>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded shadow">Submit</button>
        </div>
    )
}

export default QuizOpenHeader