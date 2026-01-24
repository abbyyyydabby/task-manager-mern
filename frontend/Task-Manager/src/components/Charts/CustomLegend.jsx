import React from "react";

const CustomLegend = ({ payload }) => {
  if (!payload || !payload.length) return null;

  return (
    <div className="flex items-center justify-center gap-6 mt-4">
      {payload.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
