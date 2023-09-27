const express = require("express");
const {
  getAllUsers,
  signUp,
  signIn,
  editUser,
  authenticateToken,
  getByUser,
  token,
  logOut,
} = require("../Controller/userController");
const router = express.Router();

router.get("/users", getAllUsers);
router.get("/userBy", authenticateToken, getByUser);
router.post("/signUp", signUp);
router.post("/token", token);
router.post("/signIn", signIn);
router.put("/edit", editUser);
router.delete("/logOut", logOut);

module.exports = router;
