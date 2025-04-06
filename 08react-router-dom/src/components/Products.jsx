import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Products = () => {
  return (
    <>
      <Link className="underline mr-3" to="new">
        New
      </Link>
      <Link className="underline" to="featured">
        Featured
      </Link>
      <Outlet />
    </>
  );
};
