const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  exportTasksReport,
  exportUsersReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/exports/tasks", protect, adminOnly, exportTasksReport);
router.get("/exports/users", protect, adminOnly, exportUsersReport);

module.exports = router;
