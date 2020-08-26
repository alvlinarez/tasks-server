const Project = require('../models/Project');
const Task = require('../models/Task');

exports.createProject = async (req, res) => {
  const { name } = req.body;
  const { user } = req;
  try {
    let project = await Project.findOne({ name, user: user.id });
    if (project) {
      return res
        .status(401)
        .json({ error: 'Project with that name already exists.' });
    }
    project = new Project({
      user: user.id,
      tasks: [],
      name
    });
    project = await project.save();
    project = project.toJSON();
    return res.status(200).json({ project });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProjects = async (req, res) => {
  const { id } = req.user;
  try {
    // Find projects by user
    const projects = await Project.find({ user: id });
    return res.status(200).json({ projects });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Create task and then add to the project
exports.addTaskToProject = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body; // Name task
  const { projectId } = req.params;
  if (!name) {
    return res.status(401).json({ error: 'Task name is required.' });
  }
  if (!projectId) {
    return res.status(401).json({ error: 'ProjectId is required.' });
  }
  try {
    let project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      return res.status(401).json({
        error: `Project not found.`
      });
    }
    const { tasks } = project;
    const taskFound = tasks.find((task) => task.name === name);
    if (taskFound) {
      return res.status(401).json({
        error: `Task with that name already exists in project.`
      });
    }
    let task = new Task({ name });
    task = await task.save();
    task = task.toJSON();
    project = await Project.findOneAndUpdate(
      { user: userId, _id: projectId },
      { $addToSet: { tasks: task.id } },
      { new: true }
    );
    if (!project) {
      return res.status(401).json({
        error: `Project not found.`
      });
    }
    return res.status(200).json({ project, taskAdded: task });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeTaskFromProject = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.body;
  const { projectId } = req.params;
  if (!taskId) {
    return res.status(401).json({ error: 'TaskId is required.' });
  }
  if (!projectId) {
    return res.status(401).json({ error: 'ProjectId is required.' });
  }
  try {
    const project = await Project.findOneAndUpdate(
      { user: userId, _id: projectId },
      { $pull: { tasks: taskId } },
      { new: true }
    );
    if (!project) {
      return res.status(401).json({
        error: `Project not found.`
      });
    }
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(401).json({
        error: 'Task to delete was not found.'
      });
    }
    return res.status(200).json({ project });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProject = async (req, res) => {
  const { tasks, name } = req.body;
  const { user } = req;
  const projectId = req.params.projectId;
  if (!projectId) {
    return res.status(401).json({ error: 'ProjectId is required.' });
  }
  try {
    // Update project if exists and if it is owned by user signed in only
    let project = await Project.findOneAndUpdate(
      { _id: projectId, user: user.id },
      { tasks, name },
      { new: true }
    );
    if (!project) {
      return res
        .status(401)
        .json({ error: 'Project not found or is not owned by user.' });
    }
    return res.status(200).json({ project });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete project and all tasks inside it
exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  if (!projectId) {
    return res.status(401).json({ error: 'ProjectId is required.' });
  }
  const { user } = req;
  try {
    let project = await Project.findOne({
      _id: projectId,
      user: user.id
    });
    if (!project) {
      return res.status(401).json({ error: 'Project not found.' });
    }
    const taskIds = project.tasks.map((task) => task.id);
    await project.delete();
    await Task.deleteMany({ _id: { $in: taskIds } });
    return res.status(200).json({
      message: 'Project deleted'
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
