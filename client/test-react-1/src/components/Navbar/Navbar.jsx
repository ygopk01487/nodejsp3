import React from "react";

const Navbar = ({ token }) => {
  return (
    <div>
      <ul style={{ display: "flex", justifyContent: "space-around" }}>
        <a href="/home">
          <li style={{ marginRight: "20px" }}>Home</li>
        </a>
        <a href="#">
          <li>About</li>
        </a>
        {token ? (
          <>
            <a href="#">
              <li>Logout</li>
            </a>
          </>
        ) : (
          <a href="/login">
            <li>Login</li>
          </a>
        )}
        <a href="/profile">
          <li>Profile</li>
        </a>
      </ul>
    </div>
  );
};

export default Navbar;
