import { useAppContext } from '../../../(providers)/AppContext';

const QuizOpenControls = () => {
    const { quizData, ctx } = useAppContext()
    const { selectedQuestionIndex, handleSelectedQuestion } = ctx
    if (!quizData) return;
    const handleNext = () => {
        if (quizData && selectedQuestionIndex < quizData.questions.length - 1) {
            handleSelectedQuestion(selectedQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (selectedQuestionIndex > 0) {
            handleSelectedQuestion(selectedQuestionIndex - 1);
        }
    };

    return (
        <div className="rounded p-2 flex justify-between">
            {selectedQuestionIndex > 0 ? (
                <button
                    onClick={handlePrevious}
                    className="px-4 py-2 bg-orange-500 text-white rounded shadow"
                >
                    Previous
                </button>
            ) : (
                <div />
            )}

            {selectedQuestionIndex < quizData.questions.length - 1 ? (
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-orange-500 text-white rounded shadow"
                >
                    Next
                </button>
            ) : (
                <div />
            )}
        </div>
    )
}

export default QuizOpenControls