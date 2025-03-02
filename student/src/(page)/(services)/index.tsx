import { FaBook, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const servicesData = [
    {
        icon: <FaUserGraduate className="text-5xl text-orange-400 mx-auto" />,
        title: "Student Learning",
        description: "Students can take quizzes and improve skills."
    },
    {
        icon: <FaChalkboardTeacher className="text-5xl text-orange-400 mx-auto" />,
        title: "Teacher Management",
        description: "Teachers can create quizzes for students."
    },
    {
        icon: <FaBook className="text-5xl text-orange-400 mx-auto" />,
        title: "Courses & Exams",
        description: "Each course has quizzes made by the assigned teacher."
    }
];

const Services = () => {
    return (
        <div className="container mx-auto py-12 text-center">
            <h2 className="text-2xl font-bold text-orange-400 mb-8">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {servicesData.map((service, index) => (
                    <div key={index} className="p-4 bg-white rounded-md shadow text-center">
                        {service.icon}
                        <h3 className="font-semibold mt-2">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
