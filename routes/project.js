const express = require('express');
const router = express.Router();
const auth = require('../utils/middleware/auth');
const projectController = require('../controllers/projectController');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const {
  createAndUpdateProjectValidator,
  addAndRemoveTaskProjectValidator
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
  addAndRemoveTaskProjectValidator,
  runValidation,
  projectController.addTaskToProject
);

router.put(
  '/:projectId/removeTask',
  auth,
  addAndRemoveTaskProjectValidator,
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
