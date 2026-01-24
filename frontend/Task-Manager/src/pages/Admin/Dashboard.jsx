import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { UserContext } from "../../context/userContext";
import { useUserAuth } from "../../hooks/useUserAuth";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import InfoCard from "../../components/Cards/InfoCard";
import TaskListTable from "../../components/layouts/TaskListTable";

import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";

import { IoMdCard } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";

const PIE_COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  // ------------------ DATA PREP ------------------
  const prepareChartData = (charts) => {
    if (!charts) return;

    const { taskDistribution, taskPriorityLevels } = charts;

    setPieChartData([
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ]);

    setBarChartData([
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ]);
  };

  // ------------------ API CALL ------------------
  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data.charts);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // ------------------ UI ACTIONS ------------------
  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  // ------------------ RENDER ------------------
  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Greeting */}
      <div className="card my-5">
        <h2 className="text-xl md:text-2xl font-semibold">
          Hello there 👋 {user?.name}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {moment().format("dddd Do MMMM YYYY")}
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="Pending"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="In Progress"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="Completed"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* LEFT: Priority Bar Chart */}
        <div className="card">
          <h5 className="text-lg font-semibold mb-4">
            Task Priority Levels
          </h5>
          <CustomBarChart data={barChartData} />
        </div>

        {/* RIGHT: Distribution Pie Chart */}
        <div className="card">
          <h5 className="text-lg font-semibold mb-4">
            Task Distribution
          </h5>
          <CustomPieChart
            data={pieChartData}
            colors={PIE_COLORS}
          />
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card my-6">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-semibold">
            Recent Tasks
          </h5>

          <button
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary"
            onClick={onSeeMore}
          >
            See All <LuArrowRight />
          </button>
        </div>

        <TaskListTable tableData={dashboardData?.recentTasks || []} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
