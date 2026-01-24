import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box flex items-center gap-2">
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={22}
              className="text-blue-600 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
