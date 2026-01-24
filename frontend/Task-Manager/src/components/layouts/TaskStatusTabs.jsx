import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative px-3 md:px-4 py-2 text-sm font-medium
              ${
                activeTab === tab.label
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab(tab.label)}
          >
            <div className="flex items-center gap-1">
              <span className="text-xs">{tab.label}</span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full
                  ${
                    activeTab === tab.label
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
              >
                {tab.count}
              </span>
            </div>

            {activeTab === tab.label && (
              <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-primary rounded" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
