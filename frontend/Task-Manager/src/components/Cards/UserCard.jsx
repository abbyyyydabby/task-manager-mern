import React from "react";

const UserCard = ({ user }) => {
  const {
    name,
    email,
    profileImageUrl,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  } = user;

  // ✅ FIX: backend already sends full URL
  const imageSrc = profileImageUrl?.startsWith("http")
    ? profileImageUrl
    : "/default-avatar.png";

  return (
    <div className="card flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={imageSrc}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/default-avatar.png";
          }}
        />

        <div>
          <h4 className="font-semibold text-black">{name}</h4>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-purple-600 font-semibold">
            {pendingTasks ?? 0}
          </p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>

        <div>
          <p className="text-cyan-600 font-semibold">
            {inProgressTasks ?? 0}
          </p>
          <p className="text-xs text-gray-500">In Progress</p>
        </div>

        <div>
          <p className="text-lime-600 font-semibold">
            {completedTasks ?? 0}
          </p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
