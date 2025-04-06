import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/authContext";

export const Navbar = () => {
  const auth = useAuth();
  return (
    <nav className="mb-5">
      <NavLink
        className={({ isActive }) =>
          `${isActive ? " font-black" : "underline"} mr-2`
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? " font-black" : "underline"} mr-2`
        }
        to="/about"
      >
        About
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? " font-black" : "underline"} mr-2`
        }
        to="/products"
      >
        Products
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? " font-black" : "underline"} mr-2`
        }
        to="/profile"
      >
        Profile
      </NavLink>
      {!auth.user && (
        <NavLink
          className={({ isActive }) =>
            `${isActive ? " font-black" : "underline"} mr-2`
          }
          to="/login"
        >
          login
        </NavLink>
      )}
    </nav>
  );
};
