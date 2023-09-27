const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

let refreshTokens = [];

const getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    return res.status(200).json({ success: true, data: getUsers });
  } catch (error) {
    return res.status(400).json({ success: false, message: "get user fail!" });
  }
};

const getByUser = async (req, res) => {
  const { user } = req;

  try {
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "get by user fail!" });
  }
};

//create user
const signUp = async (req, res) => {
  const { name, email, password, rePassword } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: "not null!" });
  }
  if (password !== rePassword) {
    return res.status(400).json({ success: false, message: "not password!" });
  }
  const getEmail = await User.findOne({ email });
  if (getEmail) {
    return res.status(400).json({
      success: false,
      message: "email already available!",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, password: hashPassword });
  try {
    await newUser.save();
    return res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "create user fail!" });
  }
};

//login
const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "not null!" });
  }
  try {
    const user = await User.findOne({ email });

    const compareHashed = await bcrypt.compare(password, user.password);

    if (!compareHashed) {
      return res.status(400).json({ success: false, message: "!!!!!!!!!!!!!" });
    }

    const accessToken = await generateAccessToken({ user });

    const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);

    refreshTokens.push(refreshToken);

    return res
      .status(200)
      .json({ success: true, token: accessToken, refreshToken: refreshToken });
  } catch (error) {
    return res.status(400).json({ success: false, message: "sign in fail!" });
  }
};

//authenticateToken
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Token null!" });
  }
  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, message: "fail!!!!!!!!" });
    }
    req.user = user;
    next();
  });
};

//generateAccessToken
const generateAccessToken = async ({ user }) => {
  try {
    const accessToken = await jwt.sign(
      { user },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    return accessToken;
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "fail!!!!!!!!2222" });
  }
};

//token
const token = async (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null)
    return res.status(400).json({ success: false, message: "token nulllll22" });
  if (!refreshTokens.includes(refreshToken))
    return res.status(400).json({ success: false, message: "can't find it" });
  try {
    const token = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = await generateAccessToken({ user: token.user });

    res.status(200).json({ success: true, accessToken: accessToken });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "fail!!!!!!!!3333" });
  }
};

const editUser = async (req, res) => {
  const { email, resetPassword, rePassword } = req.body;
  if (!email || !resetPassword || !rePassword) {
    return res.status(400).json({ success: false, message: "not null!" });
  }
  if (resetPassword !== rePassword) {
    return res.status(400).json({ success: false, message: "password fail!" });
  }

  try {
    const checkEmail = await User.findOne({ email });

    if (!checkEmail) {
      return res.status(404).json({ message: "email not found!" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(resetPassword, salt);

    const newUser = await User.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true }
    );

    if (!newUser) {
      return res
        .status(401)
        .json({ success: false, message: "user null!!!!!!" });
    }
    return res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: "edit fail!" });
  }
};

//logout
const logOut = async (req, res) => {
  const { token } = req.body;
  try {
    refreshTokens = await refreshTokens.filter((tokens) => tokens !== token);
    return res.status(204).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, message: "log out fail!" });
  }
};

module.exports = {
  getAllUsers,
  signUp,
  signIn,
  editUser,
  authenticateToken,
  getByUser,
  token,
  logOut,
};
