import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";

import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";
import Modal from "../../components/layouts/Modal";
import DeleteAlert from "../../components/layouts/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    attachments: [],
    assignedTo: [],
    todoChecklist: [], // ✅ ALWAYS OBJECTS
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      attachments: [],
      assignedTo: [],
      todoChecklist: [],
    });
  };

  // ---------------- CREATE TASK ----------------
  const createTask = async () => {
    try {
      setLoading(true);

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: moment(taskData.dueDate).toISOString(),
      });

      toast.success("Task Created Successfully");
      clearData();
      navigate("/admin/tasks");
    } catch (error) {
      toast.error("Failed to create task");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UPDATE TASK ----------------
  const updateTask = async () => {
    try {
      setLoading(true);

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: moment(taskData.dueDate).toISOString(),
        todoChecklist: taskData.todoChecklist.map((item) => ({
          text: item.text,
          completed: item.completed || false,
        })),
      });

      toast.success("Task Updated Successfully");
      navigate("/admin/tasks");
    } catch (error) {
      toast.error("Failed to update task");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = () => {
    if (!taskData.title.trim()) return toast.error("Task title is required");
    if (!taskData.description.trim()) return toast.error("Description is required");
    if (!taskData.dueDate) return toast.error("Due date is required");
    if (!taskData.assignedTo.length) return toast.error("Assign at least one user");
    if (!taskData.todoChecklist.length) return toast.error("Add at least one todo");

    taskId ? updateTask() : createTask();
  };

  // ---------------- GET TASK ----------------
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      const task = response.data;
      setCurrentTask(task);

      setTaskData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: moment(task.dueDate).format("YYYY-MM-DD"),
        assignedTo: task.assignedTo.map((u) => u._id),
        todoChecklist: task.todoChecklist || [], // ✅ KEEP OBJECTS
        attachments: task.attachments || [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------- DELETE ----------------
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      toast.success("Task deleted");
      setOpenDeleteAlert(false);
      navigate("/admin/tasks");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    if (taskId) getTaskDetailsByID();
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="form-card max-w-5xl">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">
              {taskId ? "Update Task" : "Create Task"}
            </h2>

            {taskId && (
              <button
                onClick={() => setOpenDeleteAlert(true)}
                className="flex items-center gap-1 text-rose-500 bg-rose-50 px-2 py-1 rounded border"
              >
                <LuTrash2 /> Delete
              </button>
            )}
          </div>

          {/* TITLE */}
          <input
            className="form-input mt-4"
            placeholder="Task Title"
            value={taskData.title}
            onChange={(e) => handleValueChange("title", e.target.value)}
          />

          {/* DESCRIPTION */}
          <textarea
            className="form-input mt-3"
            rows={4}
            placeholder="Description"
            value={taskData.description}
            onChange={(e) => handleValueChange("description", e.target.value)}
          />

          {/* META */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <SelectDropdown
              options={PRIORITY_DATA}
              value={taskData.priority}
              onChange={(v) => handleValueChange("priority", v)}
            />

            <input
              type="date"
              className="form-input"
              value={taskData.dueDate || ""}
              onChange={(e) => handleValueChange("dueDate", e.target.value)}
            />

            <SelectUsers
              selectedUsers={taskData.assignedTo}
              setSelectedUsers={(v) => handleValueChange("assignedTo", v)}
            />
          </div>

          {/* TODO */}
          <div className="mt-6">
            <label className="text-xs font-medium">TODO Checklist</label>
            <TodoListInput
              todoList={taskData.todoChecklist}
              setTodoList={(v) => handleValueChange("todoChecklist", v)}
            />
          </div>

          {/* ATTACHMENTS */}
          <div className="mt-6">
            <AddAttachmentsInput
              attachments={taskData.attachments}
              setAttachments={(v) => handleValueChange("attachments", v)}
            />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 py-3 border rounded text-blue-600 font-semibold"
          >
            {loading ? "Saving..." : taskId ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>

      {/* DELETE MODAL */}
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={deleteTask}
          onCancel={() => setOpenDeleteAlert(false)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
