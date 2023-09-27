import React, { useEffect, useState } from "react";
import { loginUser } from "../actions/actions";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const Login = ({ token, setToken }) => {
  const cookies = new Cookies();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [msLogin, setMsLogin] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();

    const data = await loginUser({ login }, navigate);

    if (data) {
      setMsLogin("login true");
      setToken(data.token);
      cookies.set("access_token", data.token);
      cookies.set("refresh_token", data.refreshToken);
      navigate("/home");
    } else {
      setMsLogin("logn fafllll!!!!!!!");
    }
    clear();
  };

  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setLogin({ email: "", password: "" });
  };

  const forgetPass = () => {
    navigate("/forgetPass");
  };

  return (
    <div style={{ margin: "auto", width: "50%", padding: "20px" }}>
      <div
        className="messag-login"
        style={{ background: "red", textAlign: "center" }}
      >
        <h2>{msLogin}</h2>
      </div>
      <form onSubmit={Login}>
        <label>Email:</label>
        <input
          placeholder="Email..."
          style={{ padding: "10px" }}
          name="email"
          onChange={handleLogin}
          value={login.email}
        />
        <label>Password:</label>
        <input
          placeholder="Password..."
          style={{ padding: "10px" }}
          name="password"
          onChange={handleLogin}
          value={login.password}
        />
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Login
        </button>
        <button
          type="button"
          onClick={forgetPass}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          Forget Password
        </button>
      </form>
    </div>
  );
};

export default Login;
