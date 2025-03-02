import { FaQuestionCircle, FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const quizlyData = [
    {
        icon: <FaUserShield className="text-5xl text-orange-400 mx-auto" />,
        title: "Admin",
        description: "Creates users & teachers."
    },
    {
        icon: <FaChalkboardTeacher className="text-5xl text-orange-400 mx-auto" />,
        title: "Teacher",
        description: "Creates quizzes for their students."
    },
    {
        icon: <FaUserGraduate className="text-5xl text-orange-400 mx-auto" />,
        title: "Student",
        description: "Takes quizzes & learns."
    },
    {
        icon: <FaQuestionCircle className="text-5xl text-orange-400 mx-auto" />,
        title: "Quiz",
        description: "Each quiz belongs to a course."
    }
];

const QuizlyInfo = () => {
    return (
        <div className="py-12 container mx-auto text-center">
            <h2 className="text-2xl font-bold text-orange-400 mb-8">How Quizly Works?</h2>
            <div className="grid md:grid-cols-4 gap-4">
                {quizlyData.map((item, index) => (
                    <div key={index} className="rounded-md shadow-md p-4">
                        {item.icon}
                        <h3 className="mt-2 font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizlyInfo;
