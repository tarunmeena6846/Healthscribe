import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { userState } from "../store/user";
import { useRecoilState } from "recoil";
export default function Login() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(userState);

  const [formData, setFormData] = useState({
    user: {
      username: "",
      password: "",
    },
  });

  const handleChange = (e: any) => {
    setFormData({
      user: {
        ...formData.user,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();

    console.log(formData.user);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          email: formData.user.username,
          password: formData.user.password,
        }
      );
      console.log(response);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setIsUserLoggedIn({ email: response.data.user });
        navigate("/dashboard");
      } else {
        alert("Error while login");
      }
    } catch (err) {
      alert("Error while logging in");
    }
  };
  return (
    <div className="flex bg-black">
      <div className="w-full md:w-2/5 bg-black flex justify-center items-center h-screen max-sm:hidden max-md:hidden">
        <blockquote className="text-2xl font-medium text-center">
          <p className="text-4xl text-white font-semibold">
            Welcome to Avon Health
          </p>
        </blockquote>
      </div>
      <div className="w-full h-screen md:w-3/5 bg-gray-900 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="p-5">
            <h2 className="text-2xl font-semibold mb-2 text-white text-center">
              Log In
            </h2>
          </div>
          <form>
            <label className="text-left text-white">Username:</label>
            <input
              name="username"
              type="text"
              value={formData.user.username}
              onChange={handleChange}
              placeholder="Username"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <label className="text-white">Password:</label>
            <input
              name="password"
              type="password"
              value={formData.user.password}
              onChange={handleChange}
              placeholder="Password"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <div className="flex items-center mt-3 justify-center">
              <button
                className={
                  "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                }
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex items-center mt-3 justify-center">
            <button
              className={"justify-center text-blue-500 hover:underline"}
              onClick={() => {
                navigate("/register");
              }}
            >
              Need to register? Sign up for free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
