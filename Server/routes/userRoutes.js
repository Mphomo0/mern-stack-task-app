const express = require('express')
const router = express.Router()
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const checkGmailDomain = require('../middleware/checkGmailDomain')

// Define routes and link them to controller functions
router.post('/auth', authUser) // POST /auth
router.post('/', checkGmailDomain, registerUser) // POST / register
router.post('/logout', logoutUser) // Add a logout route if needed
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile) // GET /profile and PUT /profile

module.exports = router
