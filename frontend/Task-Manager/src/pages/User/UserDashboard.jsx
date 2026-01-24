import React, { useEffect, useState, useContext } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import moment from "moment";

import InfoCard from "../../components/Cards/InfoCard";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import TaskListTable from "../../components/layouts/TaskListTable";

import { IoMdCard } from "react-icons/io";

const UserDashboard = () => {
  const { user } = useContext(UserContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  const fetchDashboard = async () => {
    const res = await axiosInstance.get(
      API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
    );

    setDashboardData(res.data);

    const dist = res.data.charts.taskDistribution;
    const priority = res.data.charts.taskPriorityLevels;

    setPieData([
      { status: "Pending", count: dist.Pending },
      { status: "In Progress", count: dist.InProgress },
      { status: "Completed", count: dist.Completed },
    ]);

    setBarData([
      { priority: "Low", count: priority.Low },
      { priority: "Medium", count: priority.Medium },
      { priority: "High", count: priority.High },
    ]);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card mb-6">
        <h2 className="text-2xl">
          Greetings! {user?.name}
        </h2>
        <p className="text-sm text-gray-400">
          {moment().format("dddd Do MMMM YYYY")}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Tasks"
            value={dashboardData?.charts.taskDistribution.All || 0}
            color="bg-primary"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Pending Tasks"
            value={dashboardData?.charts.taskDistribution.Pending || 0}
            color="bg-violet-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="In Progress"
            value={dashboardData?.charts.taskDistribution.InProgress || 0}
            color="bg-cyan-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Completed"
            value={dashboardData?.charts.taskDistribution.Completed || 0}
            color="bg-lime-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="font-semibold mb-4">Task Distribution</h4>
          <CustomPieChart
            data={pieData}
            colors={["#8D51FF", "#00B8DB", "#7BCE00"]}
          />
        </div>

        <div className="card">
          <h4 className="font-semibold mb-4">Task Priority Levels</h4>
          <CustomBarChart data={barData} />
        </div>
      </div>

      <div className="card mt-6">
        <h4 className="font-semibold mb-4">Recent Tasks</h4>
        <TaskListTable
          tableData={dashboardData?.recentTasks || []}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
