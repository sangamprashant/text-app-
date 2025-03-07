import { HiOutlineUserGroup, HiOutlineBookOpen } from "react-icons/hi";
import { LuFileQuestion } from "react-icons/lu";
import { FaUserGraduate } from "react-icons/fa";

const Stats = () => {
  const iconsList = [
    { label: "people", icon: <HiOutlineUserGroup size={40} className="text-blue-500" /> },
    { label: "quiz", icon: <LuFileQuestion size={40} className="text-green-500" /> },
    { label: "students", icon: <FaUserGraduate size={40} className="text-purple-500" /> },
    { label: "courses", icon: <HiOutlineBookOpen size={40} className="text-orange-500" /> },
  ];

  const handleIcons = (label: string) => {
    return iconsList.find((d) => d.label === label)?.icon;
  };

  const adminList = [
    {
      icon: handleIcons("people"),
      label: "Teachers",
      value: 234,
    },
    {
      icon: handleIcons("students"),
      label: "Students",
      value: 1045,
    },
    {
      icon: handleIcons("courses"),
      label: "Courses",
      value: 32,
    },
    {
      icon: handleIcons("quiz"),
      label: "Quizzes",
      value: 76,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminList.map((l, i) => (
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4" key={i}>
            {l.icon}
            <div>
              <p className="text-gray-500">{l.label}</p>
              <h3 className="text-xl font-bold">{l.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stats;
