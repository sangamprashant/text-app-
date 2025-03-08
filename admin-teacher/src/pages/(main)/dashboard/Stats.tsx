import { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineBookOpen, HiOutlineUserGroup } from "react-icons/hi";
import { LuFileQuestion } from "react-icons/lu";
import { useAuth } from "../../../providers/AuthenticationContext";
import { apiRequest } from "../../../utilities/apis/apiRequest";
import headerToken from "../../../utilities/apis/headerToken";

const Stats = () => {
  const { token, user } = useAuth();
  const [counts, setCounts] = useState({
    teacherCount: 0, // Admin only
    studentCount: 0,
    quizCount: 0,
    studentQuizCount: 0,
    coursesCount: 0, // Admin only
  });

  const iconsList = [
    { label: "people", icon: <HiOutlineUserGroup size={40} className="text-blue-500" /> },
    { label: "quiz", icon: <LuFileQuestion size={40} className="text-green-500" /> },
    { label: "students", icon: <FaUserGraduate size={40} className="text-purple-500" /> },
    { label: "courses", icon: <HiOutlineBookOpen size={40} className="text-orange-500" /> },
  ];

  const handleIcons = (label: string) => iconsList.find((d) => d.label === label)?.icon;

  useEffect(() => {
    if (token) fetchCounts();
  }, [token]);

  const fetchCounts = async () => {
    if (!token || !user) return;
    try {
      const res = await apiRequest(`/${user.role}.dashboard`, "GET", undefined, headerToken(token));
      if (res?.success) {
        setCounts({
          teacherCount: res.data.teacherCount || 0,
          studentCount: res.data.studentCount || 0,
          quizCount: res.data.quizCount || 0,
          studentQuizCount: res.data.studentQuizCount || 0,
          coursesCount: res.data.coursesCount || 0, // Only for admin
        });
      }
    } catch (error) {
      console.error("Failed to fetch counts:", error);
    }
  };

  const adminList = [
    { icon: handleIcons("people"), label: "Teachers", value: counts.teacherCount },
    { icon: handleIcons("students"), label: "Students", value: counts.studentCount },
    { icon: handleIcons("courses"), label: "Courses", value: counts.coursesCount },
    { icon: handleIcons("quiz"), label: "Quizzes", value: counts.quizCount },
  ];

  const teacherList = [
    { icon: handleIcons("students"), label: "Students", value: counts.studentCount },
    { icon: handleIcons("quiz"), label: "Quizzes", value: counts.quizCount },
    { icon: handleIcons("students"), label: "Student Quizzes", value: counts.studentQuizCount },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${user?.role === "admin" ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6 `}>
      {(user?.role === "admin" ? adminList : teacherList).map((item, index) => (
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4" key={index}>
          {item.icon}
          <div>
            <p className="text-gray-500">{item.label}</p>
            <h3 className="text-xl font-bold">{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
