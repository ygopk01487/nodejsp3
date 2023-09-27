import "./App.css";
import Home from "./components/Home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import { Cookies, useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Profile from "./components/profile/profile";
import Section from "./components/Home/section";
import SignUp from "./components/Login/SignUp";
import ForgetPass from "./components/Login/forgetPass";

function App() {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
    setToken(cookies.get("access_token"));
  }, []);

  if (loading) return <h1>LOADING.....</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Navigate to="home" />} />
        <Route
          index
          path="login"
          element={
            <Login setLoading={setLoading} token={token} setToken={setToken} />
          }
        />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="forgetPass" element={<ForgetPass />} />
        <Route path="/" element={<Section token={token} />}>
          <Route
            path="home"
            element={
              <Home
                loading={loading}
                setLoading={setLoading}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route path="profile" element={<Profile token={token} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
