const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const { userSignUpValidator } = require('../utils/middleware/validators/auth');

// Sign up route
router.post('/signup', userSignUpValidator, runValidation, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: 'Email already exists.'
      });
    }
    user = new User({ name, email, password });
    try {
      await user.save();
      return res.status(200).json({
        message: 'Sign up success. Please sign in.'
      });
    } catch (e) {
      return res.status(401).json({
        error: 'Error creating user. Try signing up again.'
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
});

module.exports = router;
