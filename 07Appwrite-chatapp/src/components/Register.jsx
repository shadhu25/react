import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../util/authContext";

function Register() {
  const navigate = useNavigate();
  const { user, handleUserRegister } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password1: "",
    password2: "",
    name: "",
  });

  const handleCredentials = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen bg-amber-400 flex justify-center items-center px-50 pt-1">
      <div className="bg-blue-400 w-full text-white p-5 rounded-xl">
        <h2 className="text-2xl font-bold flex justify-center">Register</h2>
        <form onSubmit={(e) => handleUserRegister(e, credentials)}>
          <div className="flex flex-col">
            <label className="font-bold text-lg" htmlFor="name">
              Name:
            </label>
            <input
              className="border rounded focus:outline-0 p-1"
              required
              name="name"
              placeholder="enter your name"
              type="text"
              id="name"
              value={credentials.name}
              onChange={handleCredentials}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-lg" htmlFor="email">
              Email:
            </label>
            <input
              className="border rounded focus:outline-0 p-1"
              required
              name="email"
              placeholder="enter your email"
              type="email"
              id="email"
              value={credentials.email}
              onChange={handleCredentials}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="font-bold text-lg" htmlFor="password1">
              Password:
            </label>
            <input
              className="border rounded focus:outline-0 p-1"
              required
              name="password1"
              placeholder="enter your password"
              type="password"
              id="password1"
              value={credentials.password1}
              onChange={handleCredentials}
            />
          </div>
          <div className="flex flex-col">
            <input
              className="border rounded focus:outline-0 p-1"
              required
              name="password2"
              placeholder="confirm your password"
              type="password"
              value={credentials.password2}
              onChange={handleCredentials}
            />
          </div>
          <input
            className="w-full flex justify-center mt-3 font-bold bg-amber-500 focus:bg-amber-800 rounded"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
