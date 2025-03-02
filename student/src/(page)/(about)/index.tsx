import { MdOutlineInfo } from "react-icons/md";

const About = () => {
    return (
        <div className="container mx-auto py-12 text-center">
            <h2 className="text-2xl font-bold text-orange-400 mb-8 flex items-center justify-center">
                <MdOutlineInfo className="mr-2" /> About Quizly
            </h2>
            <p className="text-gray-700">
                Quizly is an online quiz platform where **admins** create **users & teachers**, who in turn create quizzes
                for students. Students can take these quizzes based on their enrolled courses.
            </p>
        </div>
    );
};

export default About;
