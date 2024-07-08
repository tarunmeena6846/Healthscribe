import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const types = ["PROVIDER", "SUPPORT", "PATIENT"];
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: {
      username: "",
      password: "",
      email: "",
      role: "",
    },
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({
      user: {
        ...formData.user,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(formData.user);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        {
          email: formData.user.email,
          password: formData.user.password,
          username: formData.user.username,
          role: formData.user.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.status === 201) {
        localStorage.setItem("token", response.token);
        console.log(localStorage.getItem("token"));
        navigate("/questionnaire");
      } else {
        alert("Error while registering");
      }
    } catch (err) {
      alert("Error while registering");
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
              Register
            </h2>
          </div>

          <form>
            <label className="text-left text-white">Email:</label>
            <input
              name="email"
              type="text"
              value={formData.user.email}
              onChange={handleChange}
              placeholder="Username"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
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
                onClick={handleRegister}
              >
                Sign up
              </button>
              <h1 className="text-white p-3">as</h1>
              <select
                name="role"
                onChange={handleChange}
                value={formData.user.role}
                className="block appearance-none border border-gray-400 hover:border-gray-500 px-4 py-2  rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <div className="flex items-center mt-3 justify-center">
            <button className={"justify-center text-blue-500 hover:underline"}>
              Already registered? Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
