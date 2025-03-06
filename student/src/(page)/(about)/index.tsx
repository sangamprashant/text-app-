import { MdOutlineInfo } from "react-icons/md";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      {/* Title Section */}
      <div className="flex items-center justify-center text-orange-500">
        <MdOutlineInfo className="text-4xl md:text-5xl mr-2" />
        <h2 className="text-3xl md:text-4xl font-bold">About Quizly</h2>
      </div>

      {/* Description Section */}
      <div className="mt-6 mx-auto bg-white p-6 md:p-8 rounded-lg">
        <p className="text-gray-700 text-lg leading-relaxed">
          <span className="font-semibold text-black">Quizly</span> is an interactive online quiz platform where
          <span className="font-bold text-orange-500"> admins </span>
          create and manage
          <span className="font-bold text-orange-500"> users & teachers</span>, who then build quizzes for students.
          Students can participate in these quizzes based on their enrolled courses, track their progress, and
          improve their learning.
        </p>
      </div>
    </div>
  );
};

export default About;
