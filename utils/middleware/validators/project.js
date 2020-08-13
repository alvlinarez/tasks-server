const { check } = require('express-validator');

exports.createProject = [
  check('name').not().isEmpty().withMessage('Name is required.'),
  check('user').not().isEmpty().withMessage('User is required.'),
  check('tasks')
    .not()
    .isEmpty()
    .withMessage('Tasks are required.')
    .not()
    .isArray()
    .withMessage('Tasks must be array')
];
