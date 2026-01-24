import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const { name, value, fill } = payload[0];

  return (
    <div className="bg-white shadow-md rounded-lg px-4 py-2 border text-sm">
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: fill }}
        />
        <span className="font-medium text-gray-800">
          {name}
        </span>
      </div>
      <p className="text-gray-600 mt-1">
        Tasks: <span className="font-semibold">{value}</span>
      </p>
    </div>
  );
};

export default CustomTooltip;
