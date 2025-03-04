import { useAppContext } from '../../../(providers)/AppContext'

const QuizOpenList = () => {
    const { quizData, ctx } = useAppContext()
    const { selectedQuestionIndex, handleSelectedQuestion } = ctx
    if (!quizData) return;
    return (
        <>
            {quizData.questions.map((q, index) => (
                <div
                    key={q._id}
                    className={`p-2 mb-2 cursor-pointer border rounded-md ${selectedQuestionIndex === index ? "bg-green-100" : "bg-gray-100"}`}
                    onClick={() => handleSelectedQuestion(index)}
                >
                    {q.question}
                </div>
            ))}

        </>
    )
}

export default QuizOpenList