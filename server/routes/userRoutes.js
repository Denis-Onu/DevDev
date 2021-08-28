const express = require('express')
const router = express.Router()
const {
  register,
  login,
  getProfile,
  editProfile,
  deleteProfile,
  getUserById,
  forgotPassword,
  resetPassword
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.route('/profile').get(protect, getProfile).put(protect, editProfile).delete(protect, deleteProfile)
router.get('/user/:id', getUserById)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

module.exports = router