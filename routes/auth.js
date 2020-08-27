const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../utils/middleware/auth');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const {
  userSignInValidator,
  userSignInProviderValidator,
  userSignUpValidator
} = require('../utils/middleware/validators/auth');

// Sign in route
router.post(
  '/signin',
  userSignInValidator,
  runValidation,
  authController.signIn
);

// Sign in with Facebook and Google
router.post(
  '/signin-provider',
  userSignInProviderValidator,
  runValidation,
  authController.signInProvider
);

// Sign up route
router.post(
  '/signup',
  userSignUpValidator,
  runValidation,
  authController.signUp
);

// Sign out route
router.post('/signout', auth, authController.signOut);

// Get authenticated user
// Cookie in req.cookie
router.get('/', authController.authenticatedUser);
// Cookie in req.body
router.post('/', authController.authenticatedUser);

module.exports = router;
