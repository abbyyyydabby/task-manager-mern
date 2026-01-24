import React from "react";
import moment from "moment";

const statusStyles = {
  Pending: "bg-purple-100 text-purple-700",
  "In Progress": "bg-cyan-100 text-cyan-700",
  Completed: "bg-green-100 text-green-700",
};

const priorityStyles = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-orange-100 text-orange-700",
  High: "bg-red-100 text-red-700",
};

const TaskListTable = ({ tableData = [] }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm text-left">
        
        {/* TABLE HEADER */}
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-3 font-medium">Name</th>
            <th className="font-medium">Status</th>
            <th className="font-medium">Priority</th>
            <th className="font-medium">Created On</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="py-6 text-center text-gray-400"
              >
                No tasks found
              </td>
            </tr>
          ) : (
            tableData.map((task) => (
              <tr
                key={task._id}
                className="hover:bg-gray-50 transition"
              >
                <td className="py-4 text-gray-900">
                  {task.title}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[task.status]
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      priorityStyles[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td className="text-gray-600">
                  {moment(task.createdAt).format("Do MMM YYYY")}
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default TaskListTable;
