import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ---------------- CUSTOM TOOLTIP ---------------- */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg px-3 py-2 border text-sm">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: payload[0].color }}
          />
          <span className="font-medium text-gray-700">
            {payload[0].name}
          </span>
        </div>
        <p className="text-gray-500 mt-1">
          {payload[0].value} Tasks
        </p>
      </div>
    );
  }
  return null;
};

/* ---------------- CUSTOM LEGEND ---------------- */
const CustomLegend = ({ payload }) => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </div>
      ))}
    </div>
  );
};

/* ---------------- PIE CHART ---------------- */
const CustomPieChart = ({ data = [], colors = [] }) => {
  if (!data.length) {
    return (
      <div className="h-81.25 flex items-center justify-center text-gray-400 text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
