import axios from "axios";
import { Cookies } from "react-cookie";

const URL = "http://localhost:5000";
const cookies = new Cookies();
const token = cookies.get("access_token");
const API = axios.create({ baseURL: `${URL}` });

API.interceptors.request.use((req) => {
  if (cookies.get("access_token")) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const Login = ({ login }) =>
  API.post(`/user/signIn`, {
    email: login.email,
    password: login.password,
  });

export const getProfile = () => {
  return API.get(`/user/userBy`);
};

export const refreshToken = ({ refreshT }) =>
  API.post(`/user/token`, { token: refreshT });

export const logOuts = ({ refreshT }) =>
  API.delete("/user/logOut", { token: refreshT });

export const SignUpS = ({ formData }) =>
  API.post("/user/SignUp", {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    rePassword: formData.rePassword,
  });

export const forgetPass = ({ formData }) =>
  API.put("/user/edit", {
    email: formData.email,
    resetPassword: formData.resetPassword,
    rePassword: formData.rePassword,
  });
