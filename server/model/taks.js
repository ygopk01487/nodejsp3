const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  complete: Boolean,
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
