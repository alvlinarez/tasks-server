const { check } = require('express-validator');

exports.createTaskValidator = [
  check('name').not().isEmpty().withMessage('Name is required.')
];

exports.updateTaskValidator = [
  check('name').not().isEmpty().withMessage('Name is required.'),
  check('state')
    .not()
    .isEmpty()
    .withMessage('State is required.')
    .isBoolean()
    .withMessage('State must be boolean')
];
