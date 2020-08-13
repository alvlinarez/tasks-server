const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { name } = req.body;
    let task = new Task({ name });
    task = await task.save();
    task = task.toJSON();
    res.status(200).json({
      task
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTask = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    return res.status(401).json({
      error: 'taskId is required.'
    });
  }
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(401).json({
        error: 'Task not found.'
      });
    }
    return res.status(200).json({
      task
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Internal server error.'
    });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { name, state } = req.body;
  if (!taskId) {
    return res.status(401).json({
      error: 'taskId is required'
    });
  }
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId },
      { name, state },
      { new: true }
    );
    if (!task) {
      return res.status(401).json({
        error: 'Task not found.'
      });
    }
    return res.status(200).json({
      task
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Internal server error.'
    });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    return res.status(401).json({
      error: 'taskId is required'
    });
  }
  try {
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(401).json({
        error: 'Task not found.'
      });
    }
    return res.status(200).json({
      message: 'Task deleted.'
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Internal server error.'
    });
  }
};
