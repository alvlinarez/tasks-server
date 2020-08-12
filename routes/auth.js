const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../utils/middleware/auth');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const { userSignInValidator, userSignUpValidator } = require('../utils/middleware/validators/auth');

// Sign in route
router.post('/auth/signin', userSignInValidator, runValidation, authController.signIn);

// Sign up route
router.post('/auth/signup', userSignUpValidator, runValidation, authController.signUp);

// Get authenticated user
router.get('/auth', auth, authController.authenticatedUser);

module.exports = router;
