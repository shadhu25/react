import React, { useEffect } from "react";
import { useAuth } from "../utils/authContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logout();
  };
  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  });

  return (
    <>
      {auth.user && (
        <div>
          <span className="mr-5">Welcome {auth.user}</span>
          <button onClick={handleLogout} className="border px-2">
            logout
          </button>
        </div>
      )}
    </>
  );
};
