import { useAppContext } from "../../../(providers)/AppContext";

const QuizOpenQuestion = () => {
    const { quizData, ctx } = useAppContext();
    const { selectedQuestionIndex, handleRemoveAnswer } = ctx;

    const selectedQuestion = quizData?.questions[selectedQuestionIndex];

    if (!selectedQuestion) return <p className="text-gray-500">Click a question to view here</p>;

    return (
        <div>
            <p className="p-4 border rounded-md bg-green-100 h-48 overflow-y-auto">
                {selectedQuestion.question}
            </p>
            <div className="grid grid-cols-2 gap-2 my-3">
                {selectedQuestion.options.map((option, index) => (
                    <OptionsButton key={index} option={option} questionId={selectedQuestion._id} />
                ))}
            </div>
            <button className="border rounded shadow p-4 bg-red-700 text-white w-full hover:bg-red-800"
                onClick={() => handleRemoveAnswer(selectedQuestion._id)}
            >Remove Answer</button>
        </div>
    );
};

export default QuizOpenQuestion;

const OptionsButton = ({ option, questionId }: { option: string; questionId: string }) => {
    const { ctx } = useAppContext();
    const { answers, handleAnswerSelection } = ctx;

    const isSelected = answers.some((answer) => answer.questionId === questionId && answer.selectedOption === option);

    return (
        <button
            className={`border rounded shadow p-4 ${isSelected ? "bg-orange-100" : "bg-green-100"}`}
            onClick={() => handleAnswerSelection(questionId, option)}
        >
            {option}
        </button>
    );
};
