import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../util/authContext";

function Login() {
  const navigate = useNavigate();
  const { user, handleUserLogin } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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
        <h2 className="text-2xl font-bold flex justify-center">Login</h2>
        <form onSubmit={(e) => handleUserLogin(e, credentials)}>
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
          <div className="flex flex-col">
            <label className="font-bold text-lg" htmlFor="password">
              Password:
            </label>
            <input
              className="border rounded focus:outline-0 p-1"
              required
              name="password"
              placeholder="enter your password"
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleCredentials}
            />
          </div>
          <input
            className="w-full flex justify-center mt-3 font-bold bg-amber-500 focus:bg-amber-800 rounded"
            type="submit"
            value="Submit"
          />
        </form>
        <div>
          I don't have an account{" "}
          <Link className="text-red-500 underline" to="/register">
            here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
