import { useAppContext } from '../../../(providers)/AppContext';

const QuizOpenQuestion = () => {
    const { quizData, ctx } = useAppContext()
    const { selectedQuestionIndex } = ctx
    if (!quizData) return;
    const selectedQuestion = quizData?.questions[selectedQuestionIndex] || null;
    return (
        <>
            {selectedQuestion ? (
                <div>
                    <p className="p-4 border rounded-md bg-green-100 h-48 overflow-y-auto">
                        {selectedQuestion.question}
                    </p>
                    <div className="grid grid-cols-2 gap-2 my-3">
                        {selectedQuestion.options.map((o, i) => (
                            <button key={i} className="bg-green-100 border rounded shadow p-4">
                                {o}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">Click a question to view here</p>
            )}

        </>
    )
}

export default QuizOpenQuestion