const tabs = ["Overview", "Profile"];

interface TB {
  handleTabls: (s: string) => void;
  tabOpen: string
}

const TabButtons = ({ handleTabls, tabOpen }: TB) => {

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 p-4 justify-center md:justify-start overflow-x-auto snap-x snap-mandatory w-max mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 border-2 rounded-full transition-all min-w-max snap-center
              ${tabOpen === tab
                ? "border-orange-500 text-black"
                : "border-black text-gray-800 hover:bg-orange-50"
              }`}
            onClick={() => handleTabls(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabButtons;
