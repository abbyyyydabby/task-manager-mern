const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

const exportTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Report");

    worksheet.columns = [
      { header: "Task ID", key: "_id", width: 25 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Status", key: "status", width: 20 },
      { header: "Due Date", key: "dueDate", width: 20 },
      { header: "Assigned To", key: "assignedTo", width: 30 },
    ];

    tasks.forEach((task) => {
      const assignedTo = Array.isArray(task.assignedTo)
        ? task.assignedTo
            .map((u) => `${u.name} (${u.email})`)
            .join(", ")
        : "Unassigned";

      worksheet.addRow({
        _id: task._id.toString(),
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate
          ? task.dueDate.toISOString().split("T")[0]
          : "",
        assignedTo,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="tasks_report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      message: "Error exporting tasks",
      error: error.message,
    });
  }
};

const exportUsersReport = async (req, res) => {
  try {
    const users = await User.find().select("name email _id").lean();
    const tasks = await Task.find().populate("assignedTo", "_id");

    const map = {};

    users.forEach((u) => {
      map[u._id] = {
        name: u.name,
        email: u.email,
        taskCount: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
      };
    });

    tasks.forEach((task) => {
      if (!Array.isArray(task.assignedTo)) return;

      task.assignedTo.forEach((u) => {
        const user = map[u._id];
        if (!user) return;

        user.taskCount++;

        if (task.status === "Pending") user.pendingTasks++;
        else if (task.status === "In Progress") user.inProgressTasks++;
        else if (task.status === "Completed") user.completedTasks++;
      });
    });

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("User Task Report");

    worksheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 40 },
      { header: "Total Tasks", key: "taskCount", width: 20 },
      { header: "Pending", key: "pendingTasks", width: 15 },
      { header: "In Progress", key: "inProgressTasks", width: 15 },
      { header: "Completed", key: "completedTasks", width: 15 },
    ];

    Object.values(map).forEach((u) => worksheet.addRow(u));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users_report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      message: "Error exporting users",
      error: error.message,
    });
  }
};

module.exports = {
  exportTasksReport,
  exportUsersReport,
};
