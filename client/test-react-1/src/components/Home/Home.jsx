import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { logOut } from "../actions/actions";
import { Cookies } from "react-cookie";

const Home = ({ token, setToken }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const refreshT = cookies.get("refresh_token");
  token = cookies.get("access_token");

  const Logout = async () => {
    const log = await logOut({ refreshT });
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    setToken(null);
    navigate("/login");
  };

  // console.log(token);

  // useEffect(() => {
  //   if (token === null) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div style={{ margin: "auto", height: "100px" }}>
      <h1>hello !!!!!!!!!!</h1>
      <button onClick={Logout}>Logout</button>
    </div>
  );
};

export default Home;
