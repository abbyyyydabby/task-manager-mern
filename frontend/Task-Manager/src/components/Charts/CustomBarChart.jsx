import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const PRIORITY_COLORS = {
  Low: "#EF4444",      // red
  Medium: "#FACC15",   // yellow
  High: "#3B82F6",     // blue
};

const CustomBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="priority"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip />

        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PRIORITY_COLORS[entry.priority]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
