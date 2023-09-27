const express = require("express");
const {
  getAllTask,
  createTask,
  editTask,
  deleteTask,
} = require("../Controller/Task");
const router = express.Router();

router.get("/", getAllTask);
router.post("/post", createTask);
router.put("/put/:id", editTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
