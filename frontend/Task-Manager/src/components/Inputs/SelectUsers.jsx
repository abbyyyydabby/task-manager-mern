import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import Modal from "../layouts/Modal";
import AvatarGroup from "../layouts/AvatarGroup";
import { LuUsers } from "react-icons/lu";

const SelectUsers = ({ selectedUsers = [], setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [tempSelectedIds, setTempSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ===========================
     FETCH USERS ONCE
  ============================ */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
        setAllUsers(res.data || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  /* ===========================
     SYNC TEMP STATE
  ============================ */
  useEffect(() => {
    setTempSelectedIds(selectedUsers);
  }, [selectedUsers]);

  /* ===========================
     TOGGLE USER
  ============================ */
  const toggleUser = (userId) => {
    setTempSelectedIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  /* ===========================
     CONFIRM SELECTION
  ============================ */
  const handleAssign = () => {
    setSelectedUsers(tempSelectedIds); // IDs only
    setIsModalOpen(false);
  };

  /* ===========================
     DERIVED UI DATA
  ============================ */
  const selectedUserObjects = allUsers.filter((user) =>
    selectedUsers.includes(user._id)
  );

  /* ===========================
     RENDER
  ============================ */
  return (
    <div className="space-y-3">
      {selectedUserObjects.length === 0 ? (
        <button
          type="button"
          className="card-btn flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <LuUsers /> Add Members
        </button>
      ) : (
        <div
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <AvatarGroup users={selectedUserObjects} />
        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        {/* USERS LIST */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <img
                src={user.profileImageUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedIds.includes(user._id)}
                onChange={() => toggleUser(user._id)}
                className="w-4 h-4"
              />
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition"
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
