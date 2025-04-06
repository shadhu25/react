import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const auth = useAuth();
  const handleLogin = () => {
    auth.login(username);
  };
  useEffect(() => {
    if (auth.user) {
      navigate("/profile");
    }
  });
  return (
    <>
      {!auth.user && (
        <div>
          <label>Username:</label>
          <input
            className="border ml-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin} className="border px-2 ml-4">
            login
          </button>
        </div>
      )}
    </>
  );
};
