import React, { useState } from "react";
import { forgetP } from "../actions/actions";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const [formData, setFormData] = useState({
    email: "",
    resetPassword: "",
    rePassword: "",
  });

  const navigate = useNavigate();

  const [msForget, setMsForget] = useState("");

  const forgetPass = async (e) => {
    e.preventDefault();
    const data = await forgetP({ formData });
    if (data) {
      navigate("/login");
    } else {
      setMsForget("forget fail!!!!!!!");
    }
    clear();
  };

  const handlePass = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setFormData({
      email: "",
      resetPassword: "",
      rePassword: "",
    });
  };

  return (
    <div style={{ margin: "auto", width: "50%", padding: "20px" }}>
      <div
        className="messag-login"
        style={{ background: "red", textAlign: "center" }}
      >
        <h2>{msForget}</h2>
      </div>
      <form onSubmit={forgetPass}>
        <label>Email:</label>
        <input
          placeholder="Email..."
          style={{ padding: "10px" }}
          name="email"
          onChange={handlePass}
          value={formData.email}
        />
        <label>ResetPassword:</label>
        <input
          placeholder="Password..."
          style={{ padding: "10px" }}
          name="resetPassword"
          onChange={handlePass}
          value={formData.resetPassword}
        />
        <label>Re password:</label>
        <input
          placeholder="Password..."
          style={{ padding: "10px" }}
          name="rePassword"
          onChange={handlePass}
          value={formData.rePassword}
        />
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Change
        </button>
      </form>
    </div>
  );
};

export default ForgetPass;
