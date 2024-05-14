import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

import { baseUrl } from "../../../api/base_urls";
import astera from "../../../assets/astera.jpg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post(`${baseUrl}users/signin`, formdata);

      if (response.status === 200) {
        const { jwt } = response.data;
        localStorage.setItem("jwt", jwt);
        navigate("/");
        window.location.reload();
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      setError(`${error.response.data.message}`);
    }
  };

  return (
    <div>
      <img className="ml-[44%]" src={astera} alt="" />
      <h2 className="text-3xl font-bold text-center text-gray-800">
        {" "}
        Admin Login
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-8 mt-10">
          <label
            htmlFor="email"
            className="text-3xl font-bold ml-[42%] text-gray-800"
          >
            Email:
          </label>
          <input
            type="email"
            className="text-xl  border-2 border-grey-400 mt-2 text-center text-gray-800"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-row gap-10 mt-8">
          <label
            htmlFor="password"
            className="text-3xl font-bold ml-[38%] text-gray-800"
          >
            Password:
          </label>
          <input
            type="password"
            className="text-xl  border-2 border-grey-400 mt-2 text-center text-gray-800"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex flex-row gap-[2rem]">
          <button
            type="submit"
            className="ml-[48%] mt-[3rem] text-3xl font-bold text-center text-gray-800 hover:text-gray-600 hover:text-4xl"
          >
            Login
          </button>
        </div>
        {error && (
          <div className="text-xl font-bold text-center text-red-600 mt-[1rem]">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
