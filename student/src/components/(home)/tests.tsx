import { ImFileText2 } from "react-icons/im";
import { Link } from "react-router-dom";

type CourseItem = {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
};

const courses: CourseItem[] = [
    {
        id: 1,
        title: "Introduction To User Experience Design",
        duration: "5 mins",
        completed: true,
    },
    {
        id: 2,
        title: "Learn the UX Terminologies",
        duration: "10 mins",
        completed: true,
    },
    {
        id: 3,
        title: "Learn the UX Terminologies",
        duration: "10 mins",
        completed: false,
    },
];

const TestList = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            {courses.map((course) => (
                <div
                    key={course.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4"
                >
                    <div className="flex items-center gap-4">
                        <ImFileText2 className="text-8xl text-gray-700" />
                        <div>
                            <h3 className="font-semibold text-lg text-black">{course.title}</h3>
                            <p className="text-gray-600">Duration: {course.duration}</p>
                            {course.completed && (
                                <p className="text-orange-500 font-medium flex items-center">
                                    ✅ Completed
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="" className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                            {course.completed ? "Result" : "Start"}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TestList;
