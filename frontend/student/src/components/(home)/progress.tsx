
const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div className="w-full max-w-xl bg-gray-200 rounded-full h-4 relative">
            <div
                className="h-4 bg-orange-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

const ProgressDemo = () => {
    const done = 8;
    const total = 10;
    const progress = (done / total) * 100;

    return (
        <div className="flex flex-col items-center gap-2 p-4 w-full">
            <ProgressBar progress={progress} />
            <span className="text-gray-700 font-medium">{done}/{total} Completed</span>
        </div>
    );
};

export default ProgressDemo;
