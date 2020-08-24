const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const { name } = req.body;
  const { user } = req;
  try {
    let project = await Project.findOne({ name });
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

exports.addTaskToProject = async (req, res) => {
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
      { $addToSet: { tasks: taskId } },
      { new: true }
    );
    if (!project) {
      return res.status(401).json({
        error: `Project not found.`
      });
    }
    return res.status(200).json({ project });
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

exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  if (!projectId) {
    return res.status(401).json({ error: 'ProjectId is required.' });
  }
  const { user } = req;
  try {
    let project = await Project.findOneAndDelete({
      _id: projectId,
      user: user.id
    });
    if (!project) {
      return res
        .status(401)
        .json({ error: 'Project not found or is not owned by user.' });
    }
    return res.status(200).json({
      message: 'Project deleted'
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
