import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPaths";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.AUTH.GET_PROFILE
      );
      setUser(response.data);
    } catch (error) {
      console.error("User not authenticated", error);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchUser();
  }, []);

  const updateUser = async () => {
    await fetchUser(); // 🔥 correct behavior
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, loading, updateUser, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
