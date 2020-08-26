const express = require('express');
const router = express.Router();
const auth = require('../utils/middleware/auth');
const projectController = require('../controllers/projectController');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const {
  createAndUpdateProjectValidator,
  addTaskProjectValidator,
  removeTaskProjectValidator
} = require('../utils/middleware/validators/project');

router.post(
  '/',
  auth,
  createAndUpdateProjectValidator,
  runValidation,
  projectController.createProject
);

router.get('/', auth, projectController.getProjects);

router.put(
  '/:projectId/addTask',
  auth,
  addTaskProjectValidator,
  runValidation,
  projectController.addTaskToProject
);

router.put(
  '/:projectId/removeTask',
  auth,
  removeTaskProjectValidator,
  runValidation,
  projectController.removeTaskFromProject
);

router.put(
  '/:projectId',
  auth,
  createAndUpdateProjectValidator,
  runValidation,
  projectController.updateProject
);

router.delete('/:projectId', auth, projectController.deleteProject);

module.exports = router;
