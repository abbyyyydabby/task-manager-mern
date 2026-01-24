import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import UserCard from "../../components/Cards/UserCard";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.USERS.GET_ALL_USERS
      );
      setUsers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DOWNLOAD USER REPORT
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.REPORTS.EXPORT_USERS,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "user_details.xlsx";

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Error downloading user report");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Team Members</h2>

        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 transition"
        >
          ⬇ Download Report
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-sm text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageUsers;
