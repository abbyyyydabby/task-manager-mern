import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        { email, password }
      );

      const { token, role } = response.data;

      if (!token) throw new Error("Token missing from response");

      localStorage.setItem("token", token);

      // fetch & update user context
      await updateUser();

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error("LOGIN ERROR →", err);

      if (err.response) {
        setError(err.response.data?.message || "Invalid credentials");
      } else if (err.request) {
        setError("Cannot reach server. Is backend running?");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] flex flex-col mt-24 space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-black">Welcome Back</h3>
          <p className="text-sm text-slate-600 mt-1">
            Please enter your details to log in
          </p>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md font-medium transition
              ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        <p className="text-sm text-slate-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
