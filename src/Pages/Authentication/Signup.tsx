import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import singupimg from "../../assets/images/signup.svg";
import Overlay from "../../components/common/Alert";
import { AppContext } from "../../AppContext";
import axios from "axios";
import "./Signup.css"; // Import the CSS file where you define the animation

const apiUrl = (import.meta as any).env.VITE_BASE_API;

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const { setLoading, setUser } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State to track success message
  const [showOverlay, setShowOverlay] = useState(false); // State to track overlay visibility

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(apiUrl + "auth/register", payload);
      console.log("User registered successfully");
      setSuccessMessage("Account created successfully 🎉! You can now log in."); // Set success message
      setShowOverlay(true); // Show overlay
      setTimeout(() => {
        navigate("/signin");
      }, 1000); // Navigate after 2 seconds
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`min-h-screen flex font-lato relative`}>
      {/* Overlay Message */}
      {showOverlay && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-gray-100 p-4 shadow-lg rounded-md z-50 border border-gray-300">
          <p className="text-lg font-bold text-center">{successMessage}</p>
        </div>
      )}

      {/* Left Side */}
      <div className={`w-1/2 bg-yellow-200 flex flex-col animate-fadeIn ${showOverlay ? "blur-sm" : ""}`}>
        <h1 className="text-4xl font-bold text-black-600 mb-4 font-ubuntu mt-8 ml-8">
          Vya<span className="text-[#FCBD01]">par</span> Launch
          <span className="text-[#FCBD01]">pad</span>
        </h1>

        <div className="flex flex-col items-center justify-center h-full">
          <img src={singupimg} alt="E-commerce" className="w-3/4 mb-4 animate-fadeIn" />
          <h2 className="text-3xl font-bold mb-2 text-center">
            Let's get Started
          </h2>
          <p className="text-lg text-center">
            Your Multilingual gateway to global e-commerce!
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className={`w-1/2 bg-white flex flex-col justify-center items-center p-8 ${showOverlay ? "blur-sm" : ""}`}>
        <div className="animate-slideUpWithRebound">
          <h2 className="text-2xl font-bold mb-4 font-poppins">
            Create an account
          </h2>
          <p className="mb-4">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500">
              Log in
            </a>
          </p>

          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <label className="block text-gray-700 font-poppins">
                  First name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="w-1/2 ml-2">
                <label className="block text-gray-700">Last name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm your password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="show-password"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password" className="text-gray-700">
                Show password
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md"
            >
              Create an account
            </button>
          </form>
        </div>
      </div>

      {showOverlay && (
  <div className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-gray-100 p-4 shadow-lg rounded-md z-50 border border-gray-300 animate-fadeIn2`}>
    <p className="text-lg font-bold text-center">{successMessage}</p>
  </div>
)}
    </div>
  );
};

export default SignUp;
