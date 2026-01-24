import React, { useContext, useState } from "react"; 
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    let profileImageUrl = "";

    try {
      if (profilePic) {
        const uploadRes = await uploadImage(profilePic);
        profileImageUrl = uploadRes?.imageUrl || "";
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          name: fullName,
          email,
          password,
          adminInviteToken,
          profileImageUrl, // ✅ FIXED key
        }
      );

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        await updateUser(); // ✅ FIXED usage

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      {/* 🔒 LAYOUT COMPLETELY UNCHANGED */}
      <div className="lg:w-[70%] flex flex-col mt-20 space-y-8">

        <div>
          <h3 className="text-2xl font-semibold text-black">
            Create an Account
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Join us today by entering your details below.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">

          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              type="text"
            />

            <Input
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              type="email"
            />

            <Input
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 Characters"
              type="password"
            />

            <Input
              label="Admin Invite Token"
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
              placeholder="6 Digit Code"
              type="text"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-md font-medium hover:bg-blue-600 transition"
          >
            SIGN UP
          </button>
        </form>

        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
