import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Section = ({ token }) => {
  return (
    <div>
      <Navbar token={token} />
      <Outlet />
    </div>
  );
};

export default Section;
