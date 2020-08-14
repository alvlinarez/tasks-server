const { check } = require('express-validator');

exports.createAndUpdateProjectValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required.')
    .isString()
    .withMessage('Name must be string'),
  check('tasks').isArray().withMessage('Tasks must be array')
];
