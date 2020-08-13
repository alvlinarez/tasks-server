const { check } = require('express-validator');

exports.createTasks = [
  check('name').not().isEmpty().withMessage('Name is required.'),
  check('state')
    .not()
    .isEmpty()
    .withMessage('State is required.')
    .not()
    .isBoolean()
    .withMessage('State must be boolean')
];
