import {
  Login,
  SignUpS,
  forgetPass,
  getProfile,
  logOuts,
  refreshToken,
} from "../api/api";

export const loginUser = async ({ login }) => {
  try {
    const data = await Login({ login });
    return data.data;
  } catch (error) {
    console.log("Login fail!!!!");
  }
};

export const getUserBy = async () => {
  try {
    const { data } = await getProfile();

    return data.user;
  } catch (error) {
    console.log("get user fail!!!!");
  }
};

export const refreshTokens = async ({ refreshT }) => {
  try {
    const { data } = await refreshToken({ refreshT });

    return data.accessToken;
  } catch (error) {
    console.log("refresh token fail!!!!");
  }
};

export const logOut = async ({ refreshT }) => {
  {
    try {
      const log = await logOuts({ refreshT });
    } catch (error) {
      console.log("logOut fail!!!!");
    }
  }
};

export const SignUpss = async ({ formData }) => {
  try {
    const { data } = await SignUpS({ formData });
    console.log(data);
    return data;
  } catch (error) {
    console.log("SingUp fail!!!!");
  }
};

export const forgetP = async ({ formData }) => {
  try {
    const { data } = await forgetPass({ formData });
    console.log(data);
    return data;
  } catch (error) {
    console.log("forget fail!!!!");
  }
};
