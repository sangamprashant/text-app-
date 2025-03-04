import { useAppContext } from '../../../(providers)/AppContext';

const QuizOpenHeader = () => {
    const { quizData, ctx } = useAppContext()
    const { handleSubmitButton, formatTime } = ctx
    if (!quizData) return;
    return (
        <div className="bg-white shadow-md p-4 text-lg font-bold flex justify-between items-center">
            <p>Time left: {formatTime()}</p>
            <button className="px-4 py-2 bg-orange-500 text-white rounded shadow" onClick={handleSubmitButton}>Submit</button>
        </div>
    )
}

export default QuizOpenHeader