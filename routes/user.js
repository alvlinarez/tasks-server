const express = require('express');
const router = express.Router();
const User = require('../models/User');

// router.get(
//   '/user/:id',
//   async (req, res) => {
//     const userId = req.params.id;
//     if (!userId) {
//       return res.status(400).json({
//         error: 'userId not found'
//       });
//     }
//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(400).json({
//           error: 'User not found'
//         });
//       }
//       const { _id: id, name, email, createdAt, updatedAt } = user;
//       return res.json({
//         id,
//         name,
//         email,
//         createdAt,
//         updatedAt
//       });
//     } catch (e) {
//       return res.status(500).json({
//         error: 'Internal server error'
//       });
//     }
//   }
// );

module.exports = router;
