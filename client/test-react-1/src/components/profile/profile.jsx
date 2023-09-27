import React, { useEffect, useState } from "react";
import { getUserBy, refreshTokens } from "../actions/actions";
import { Cookies } from "react-cookie";

const Profile = ({}) => {
  const [name, setName] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("access_token");
  const refreshT = cookies.get("refresh_token");

  const getUser = async () => {
    const data = await getUserBy({ token });
    setName(data.user.name);
  };

  const refresh = async () => {
    const token = await refreshTokens({ refreshT });
    cookies.set("access_token", token);
  };

  useEffect(() => {
    getUser();

    // refresh token
    setInterval(() => {
      refresh();
    }, 5000);
  }, []);

  return (
    <div>
      <h1>Hi {name}</h1>
    </div>
  );
};

export default Profile;
