import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setMenuItems(
        user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  const handleClick = (path) => {
    if (path === "logout") {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  // 🔥 CRITICAL FIX: absolute image URL safety
  const profileImage =
    user?.profileImageUrl?.startsWith("http")
      ? user.profileImageUrl
      : user?.profileImageUrl
      ? `http://localhost:8000${user.profileImageUrl}`
      : "/profileimage.png";

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Profile */}
      <div className="flex flex-col items-center pt-6 pb-4">
        <img
          src={profileImage}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
          onError={(e) => {
            e.currentTarget.src = "/default-avatar.png";
          }}
        />

        {user?.role === "admin" && (
          <span className="mt-2 text-xs font-medium bg-primary text-white px-3 py-0.5 rounded">
            Admin
          </span>
        )}

        <h4 className="mt-3 font-semibold text-gray-900">
          {user?.name}
        </h4>
        <p className="text-xs text-gray-500">
          {user?.email}
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => {
          const isActive = activeMenu === item.label;

          return (
            <button
              key={index}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 px-6 py-3 text-sm transition
                ${
                  isActive
                    ? "text-primary bg-blue-50 border-r-4 border-primary"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <item.icon className="text-lg" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideMenu;
