const QuizOpenGuide = () => {
    return (
        <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">Active Question</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">Answered</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">Unanswered</span>
            </div>
        </div>
    );
};

export default QuizOpenGuide;
