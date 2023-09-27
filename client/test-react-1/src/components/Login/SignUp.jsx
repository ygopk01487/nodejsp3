import React, { useState } from "react";
import { SignUpss } from "../actions/actions";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SignUpHandle = async (e) => {
    e.preventDefault();

    const data = await SignUpss({ formData });

    if (data) {
      alert("Truee!!!!!!!!");
      navigate("/login");
    } else {
      alert("False!!!!!!");
    }

    clear();
  };

  const clear = () => {
    setFormData({ name: "", email: "", password: "", rePassword: "" });
  };

  return (
    <div style={{ margin: "auto", width: "50%", padding: "20px" }}>
      <div
        className="messag-login"
        style={{ background: "red", textAlign: "center" }}
      ></div>
      <form onSubmit={SignUpHandle}>
        <label>Name:</label>
        <input
          placeholder="Name..."
          style={{ padding: "10px" }}
          name="name"
          onChange={handleSignUp}
          value={formData.name}
        />
        <label>Email:</label>
        <input
          placeholder="Email..."
          style={{ padding: "10px" }}
          name="email"
          onChange={handleSignUp}
          value={formData.email}
        />
        <label>Password:</label>
        <input
          placeholder="Password..."
          style={{ padding: "10px" }}
          name="password"
          onChange={handleSignUp}
          value={formData.password}
        />
        <label>Re password:</label>
        <input
          placeholder="Re Password..."
          style={{ padding: "10px" }}
          name="rePassword"
          onChange={handleSignUp}
          value={formData.rePassword}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
