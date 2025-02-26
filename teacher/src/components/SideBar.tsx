import React, { useState } from "react";
import {
    HiOutlineClipboardList,
    HiOutlineViewGrid, HiX
} from "react-icons/hi";
import { PiBooksThin, PiChalkboardTeacherLight, PiUserCircleGearLight } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";

import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthenticationContext";
import { useSidebar } from "../providers/SidebarContext";
import Logo from "./sidebar/Logo";
import SideLinks from "./sidebar/SideLinks";
import Title from "./sidebar/Title";
import Topbar from "./sidebar/Topbar";

interface SideBarProps {
    children: React.ReactNode;
}

// Sidebar Links
const linksListAdmin = [
    { title: "Dashboard Admin", link: "/dashboard", icon: <HiOutlineViewGrid size={22} /> },
    {
        title: "Courses", icon: <PiBooksThin size={22} />, subLinks: [
            { title: "All Courses", link: "/courses" },
            { title: "Add a Course", link: "/courses/add" },
        ]
    },
    {
        title: "Teachers", icon: <PiChalkboardTeacherLight size={22} />, subLinks: [
            { title: "All Teachers", link: "/teachers" },
            { title: "Add a Teacher", link: "/teachers/add" },
        ]
    },
];

const linksListTeacher = [
    { title: "Dashboard Teacher ", link: "/dashboard", icon: <HiOutlineViewGrid size={22} /> },

    {
        title: "Bookings", icon: <HiOutlineClipboardList size={22} />, subLinks: [
            { title: "Search", link: "/bookings/search" },
            { title: "Create Booking", link: "/bookings/create" },
            { title: "Payment Received", link: "/templates/create" },
            { title: "Completed", link: "/templates/create" },
        ]
    },

];

const Dashboard = ({ children }: SideBarProps) => {
    const { isOpen, closeSidebar } = useSidebar();
    const { logout, user } = useAuth();
    const [activeSubMenu, setActiveSubMenu] = useState<number[]>([]);
    let linksList = user?.role === "admin" ? linksListAdmin : linksListTeacher

    const toggleSubMenu = (index: number) => {
        activeSubMenu.includes(index) ? setActiveSubMenu(activeSubMenu.filter(i => i !== index)) : setActiveSubMenu([...activeSubMenu, index])
    };



    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <div
                className={`absolute md:relative bg-white dark:bg-gray-900 shadow-md border-r border-gray-700 transition-all duration-300 
                ${isOpen ? "w-64 translate-x-0" : "-translate-x-64"} md:w-64 md:translate-x-0 
                h-screen z-50 flex flex-col`}
            >
                <div className="flex items-center justify-between p-4">
                    <Link to="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="text-xl font-semibold hidden md:block text-white">QUIZLY</span>
                    </Link>
                    <button onClick={() => closeSidebar()} className="md:hidden text-gray-700 dark:text-gray-300">
                        <HiX size={24} />
                    </button>
                </div>
                {/* Sidebar Navigation Links */}
                <nav className="flex flex-col px-2 flex-1 overflow-y-auto max-h-[calc(100vh-120px)]">
                    <Title title="Menu" />
                    {linksList.map((link, index) => (
                        <div key={index} className="mb-1">
                            {/* Main Link */}
                            {link.link ? (
                                <SideLinks {...link} />
                            ) : (
                                <div className="cursor-pointer text-gray-300 flex items-center px-3 py-2 rounded-md hover:bg-gray-800 justify-between"
                                    onClick={() => toggleSubMenu(index)}>
                                    <div className="flex items-center">{link.icon} <span className="ml-3">{link.title}</span></div> <FaChevronDown fontSize={12} className={`transform duration-500 ${activeSubMenu.includes(index) ? "rotate-180" : ""}`} />
                                </div>
                            )}

                            {/* Sub Navigation (if available) */}
                            {link.subLinks && activeSubMenu.includes(index) && (
                                <div className="pl-6 space-y-1">
                                    {link.subLinks.map((subLink, subIndex) => (
                                        <SideLinks key={subIndex} {...subLink} className="text-gray-400 border-s rounded-none border-white/10" />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
                {/* Push items to bottom */}
                <nav className="flex flex-col px-2 mt-auto">
                    <SideLinks key="setting" title="Settings" link="/settings" icon={<PiUserCircleGearLight />} className="text-blue-400 hover:text-blue-600" />
                    <SideLinks
                        key="logout"
                        title="Logout"
                        link="/"
                        icon={<TbLogout2 />}
                        className="text-red-500 hover:text-red-700"
                        onPress={logout}
                    />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 overflow-auto transition-all duration-300 w-full">
                <Topbar />
                {children}
            </div>
        </div>
    );
};

export default Dashboard;
