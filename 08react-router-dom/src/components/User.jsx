import React from "react";
import { Outlet, useSearchParams } from "react-router-dom";

export const User = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  return (
    <div>
      <button
        className="border p-1 bg-amber-200 mr-4"
        onClick={() => setSearchParams({ filter: "active" })}
      >
        Active users{" "}
      </button>
      <button
        className="border p-1 bg-amber-200"
        onClick={() => setSearchParams({})}
      >
        reset filter{" "}
      </button>
      <p>
        {searchParams.get("filter") === "active"
          ? "user is Active"
          : "user page"}
      </p>
      <Outlet />
    </div>
  );
};
