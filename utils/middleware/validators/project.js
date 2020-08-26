const { check } = require('express-validator');

exports.createAndUpdateProjectValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required.')
    .isString()
    .withMessage('Name must be string'),
  check('tasks').isArray().withMessage('Tasks must be array').optional()
];

exports.addTaskProjectValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name of the task is required.')
    .isString()
    .withMessage('Name must be string')
];

exports.removeTaskProjectValidator = [
  check('taskId')
    .not()
    .isEmpty()
    .withMessage('TaskId is required.')
    .isString()
    .withMessage('TaskId must be string')
];
