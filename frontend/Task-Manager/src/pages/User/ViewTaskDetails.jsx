import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AvatarGroup from "../../components/layouts/AvatarGroup";
import moment from "moment";
import toast from "react-hot-toast";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [saving, setSaving] = useState(false);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-violet-100 text-violet-600";
      case "In Progress":
        return "bg-cyan-100 text-cyan-600";
      case "Completed":
        return "bg-lime-100 text-lime-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // GET TASK DETAILS
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      toast.error("Failed to load task");
    }
  };

  // TOGGLE TODO
  const updateTodoChecklist = (index) => {
    const updatedChecklist = [...task.todoChecklist];
    updatedChecklist[index].completed =
      !updatedChecklist[index].completed;

    const completedCount = updatedChecklist.filter(
      (t) => t.completed
    ).length;

    let status = "Pending";
    if (completedCount === updatedChecklist.length) {
      status = "Completed";
    } else if (completedCount > 0) {
      status = "In Progress";
    }

    setTask({
      ...task,
      todoChecklist: updatedChecklist,
      status,
    });
  };

  // SAVE TASK (✅ FIXED API)
  const handleSave = async () => {
    try {
      setSaving(true);

      await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(id),
        {
          todoChecklist: task.todoChecklist,
          status: task.status,
        }
      );

      toast.success("Task updated successfully");
      navigate("/user/tasks");
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  // ATTACHMENT CLICK
  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "http://" + link;
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) getTaskDetailsByID();
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">

              {/* HEADER */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-medium">
                  {task.title}
                </h2>

                <span
                  className={`text-[11px] md:text-[13px] font-medium px-4 py-0.5 rounded ${getStatusTagColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-3 text-sm text-slate-600">
                {task.description}
              </p>

              {/* META */}
              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-12 md:col-span-4">
                  <label className="text-xs text-slate-500">Priority</label>
                  <p className="font-medium">{task.priority}</p>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label className="text-xs text-slate-500">Due Date</label>
                  <p className="font-medium">
                    {moment(task.dueDate).format("Do MMM YYYY")}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label className="text-xs text-slate-500">Assigned To</label>

                  {/* ✅ AVATAR FIX */}
                  <AvatarGroup
                    users={
                      Array.isArray(task.assignedTo)
                        ? task.assignedTo
                            .map((u) => u?.profileImageUrl)
                            .filter(Boolean)
                        : []
                    }
                  />
                </div>
              </div>

              {/* TODO CHECKLIST */}
              <div className="mt-6">
                <label className="text-xs font-medium text-slate-500">
                  Todo Checklist
                </label>

                {task.todoChecklist.map((item, index) => (
                  <TodoCheckList
                    key={index}
                    text={item.text}
                    isChecked={item.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>

              {/* ATTACHMENTS */}
              {task.attachments?.length > 0 && (
                <div className="mt-6">
                  <label className="text-xs font-medium text-slate-500">
                    Attachments
                  </label>

                  {task.attachments.map((link, index) => (
                    <Attachment
                      key={index}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}

              {/* SAVE BUTTON */}
              <button
                disabled={saving}
                onClick={handleSave}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save & Update Task"}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

/* ---------- SUB COMPONENTS ---------- */

const TodoCheckList = ({ text, isChecked, onChange }) => (
  <div className="flex items-center gap-3 p-3">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="w-4 h-4 cursor-pointer"
    />
    <p
      className={`text-sm ${
        isChecked ? "line-through text-gray-400" : "text-gray-800"
      }`}
    >
      {text}
    </p>
  </div>
);

const Attachment = ({ link, index, onClick }) => (
  <div
    className="flex justify-between items-center bg-gray-50 border border-gray-100 px-3 py-2 rounded cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 font-semibold">
        {index < 9 ? `0${index + 1}` : index + 1}
      </span>
      <p className="text-xs truncate">{link}</p>
    </div>
    <LuSquareArrowOutUpRight className="text-gray-400" />
  </div>
);
