const Task = require("../model/taks");

const getAllTask = async (req, res) => {
  try {
    const getTasks = await Task.find();
    return res.status(200).json({ success: true, data: getTasks });
  } catch (error) {
    return res.status(400).json({ success: false, message: "get error data!" });
  }
};

const createTask = async (req, res) => {
  try {
    const { name, complete } = req.body;

    if (name === "" || (complete !== true && complete !== false)) {
      return res.status(401).json({ success: false, message: "not null!" });
    }
    const newTask = new Task({ name: name, complete: complete });
    await newTask.save();
    return res.status(200).json({ success: true, data: newTask });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "create task error!" });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, complete } = req.body;
    // console.log(name);
    // console.log(complete === null);
    if (!id) {
      return res.status(401).json({ success: false, message: "id null!" });
    }

    if (name === "" || (complete !== true && complete !== false)) {
      return res.status(401).json({ success: false, message: "not null!" });
    }

    const newTaskEdit = await Task.findByIdAndUpdate(
      id,
      { name, complete },
      { new: true }
    );

    return res.status(200).json({ success: true, data: newTaskEdit });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "edit task error!" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ success: false, message: "id null!" });
    }
    const deleteTask = await Task.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "delete task error!" });
  }
};

module.exports = { getAllTask, createTask, editTask, deleteTask };
