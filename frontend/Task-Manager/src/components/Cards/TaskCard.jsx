import React from "react";
import Progress from "../layouts/Progress";
import AvatarGroup from "../layouts/AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  createdAt,
  dueDate,
  assignedTo = [],
  attachmentCount = 0,
  completedTodoCount = 0,
  todoChecklist = [],
  onClick,
}) => {

  // ✅ FIXED PROGRESS CALCULATION
  const totalTodos = todoChecklist.length;
  const progress =
    totalTodos === 0
      ? 0
      : Math.round((completedTodoCount / totalTodos) * 100);

  const getStatusTagColor = () => {
    switch (status) {
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };

  return (
    <div
      className="card cursor-pointer space-y-3 bg-white rounded-xl shadow-sm p-4"
      onClick={onClick}
    >
      <div className="flex gap-2">
        <span className={`text-[11px] px-3 py-0.5 rounded ${getStatusTagColor()}`}>
          {status}
        </span>
        <span className={`text-[11px] px-3 py-0.5 rounded ${getPriorityTagColor()}`}>
          {priority} Priority
        </span>
      </div>

      <div
        className={`pl-4 border-l-[3px] ${
          status === "In Progress"
            ? "border-cyan-500"
            : status === "Completed"
            ? "border-indigo-500"
            : "border-violet-500"
        }`}
      >
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-slate-600">{description}</p>

        <p className="text-xs text-slate-500 mt-2">
          Task Done: {completedTodoCount} / {totalTodos}
        </p>

        <Progress progress={progress} status={status} />
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500">
        <div>
          <label>Start Date</label>
          <p>{moment(createdAt).format("Do MMM YYYY")}</p>
        </div>
        <div>
          <label>Due Date</label>
          <p>{moment(dueDate).format("Do MMM YYYY")}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 px-4">
        <AvatarGroup avatars={assignedTo} />

        {attachmentCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                <LuPaperclip className="text-base text-slate-700" />
                <span className="font-medium">{attachmentCount}</span>
            </div>
        )}
        </div>

    </div>
  );
};

export default TaskCard;
