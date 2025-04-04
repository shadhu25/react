import React from "react";
import { useAuth } from "../util/authContext";

const Header = () => {
  const { user, handleUserLogout } = useAuth();

  return (
    <>
      {user ? (
        <div className="flex justify-between">
          <span className="font-bold text-lg text-amber-300">
            welcome {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </span>
          <button
            className="bg-red-500 py-1 px-2 rounded-full font-bold hover:bg-red-800"
            onClick={handleUserLogout}
          >
            logout
          </button>
        </div>
      ) : (
        <button className="bg-red-500 py-1 px-2 rounded-full font-bold hover:bg-red-800">
          login
        </button>
      )}
    </>
  );
};

export default Header;
