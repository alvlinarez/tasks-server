const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../utils/middleware/auth');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const {
  createTaskValidator,
  updateTaskValidator
} = require('../utils/middleware/validators/task');

router.post(
  '/task',
  auth,
  createTaskValidator,
  runValidation,
  taskController.createTask
);

router.get('/task/:taskId', auth, taskController.getTask);

router.put(
  '/task/:taskId',
  auth,
  updateTaskValidator,
  runValidation,
  taskController.updateTask
);

router.delete('/task/:taskId', auth, taskController.deleteTask);

module.exports = router;
