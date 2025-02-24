import { useState } from "react";

const tabs = ["Overview", "Assignments", "Grades", "Discussion", "Materials"];

const TabButtons = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex gap-4 p-4 justify-center overflow-x-auto max-w-full scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-6 py-2 border-2 rounded-full transition-all whitespace-nowrap 
            ${
              activeTab === tab
                ? "border-orange-500 text-black font-semibold"
                : "border-black text-gray-800 hover:bg-gray-100"
            }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
