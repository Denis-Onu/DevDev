const asyncHandler = require('express-async-handler')
const throwError = require('../utils/throwError')
const User = require('../models/User')
const Post = require('../models/Post')
const generateToken = require('../utils/generateToken')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throwError(res, 'Please fill in all the fields', 400)
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throwError(res, 'User already exists', 400)
  }

  const user = await User.create({ name, email, password })
  res.json({
    id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    createdAt: user.createdAt,
    token: generateToken(user._id)
  })
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!email || !password) {
    throwError(res, 'Please fill in all the fields', 400)
  }

  if (!user) {
    throwError(res, 'User not found', 404)
  }

  if (await user.matchPassword(password)) {
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
      token: generateToken(user._id)
    })
  } else {
    throwError(res, 'Wrong password', 401)
  }

})

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId)
  const posts = await Post.find({ user: req.userId })

  res.json({
    id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    createdAt: user.createdAt,
    posts
  })
})

const editProfile = asyncHandler(async (req, res) => {
  const { name, avatar, newPassword, currentPassword } = req.body
  const user = await User.findById(req.userId)

  if (!currentPassword) {
    throwError(res, 'Please enter your current password', 400)
  }

  if (await user.matchPassword(currentPassword)) {
    user.name = name || user.name

    if (avatar) {
      fs.unlink(process.env.PWD + user.avatar, err => {
        if (err) {
          console.log(err)
          return
        }
      })
      user.avatar = avatar || user.avatar
    }

    if (newPassword) {
      user.password = newPassword
    }

    const editedUser = await user.save()
    res.json({
      id: editedUser._id,
      name: editedUser.name,
      email: editedUser.email,
      avatar: editedUser.avatar,
      createdAt: editedUser.createdAt
    })
  } else {
    throwError(res, 'Wrong password', 401)
  }
})

const deleteProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId)

  if (user.avatar) {
    fs.unlink(process.env.PWD + user.avatar, err => {
      if (err) {
        console.log(err)
        return
      }
    })
  }

  await user.remove()
  res.json({
    msg: 'User successfully removed'
  })
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    throwError('User not found')
  }

  res.json({
    id: user._id,
    name: user.name,
    avatar: user.avatar,
    createdAt: user.createdAt
  })
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    throwError(res, 'Please enter your email', 400)
  }

  const user = await User.findOne({ email })
  if (!user) {
    throwError(res, 'User not found', 404)
  }

  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'deni_onu@yahoo.com',
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: 60 * 30
  })

  const mailOptions = {
    from: 'deni_onu@yahoo.com',
    to: user.email,
    subject: 'Reset your DevDev account password',
    html: `
      <h1>PASSWORD RESET REQUEST</h1>
      <p>
        Hi there!<br />
        We have received your request to reset your DevDev account password. Please click the link below to reset your password.<br />
        <a href='${process.env.CLIENT_URL}/reset-password/${token}'>
          Reset my password
        </a>
      </p>
    `
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throwError(res, 'Could not send email', 400)
    } else {
      console.log('Email sent: ' + info.response);
    }

  })

  res.json({
    msg: 'We have sent you an email. Please check your inbox.'
  })
})

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  const emailToken = req.params.token

  if (!password) {
    throwError(res, 'Please enter your new password', 400)
  }

  try {
    const decoded = jwt.verify(emailToken, process.env.JWT_SECRET)
    const user = await User.findOne({ email: decoded.email })
    user.password = password

    const savedUser = await user.save()
    res.json({
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      avatar: savedUser.avatar,
      token: generateToken(savedUser.id)
    })
  } catch (error) {
    throwError(res, 'Link is expired', 400)
  }

})

module.exports = {
  register,
  login,
  getProfile,
  editProfile,
  deleteProfile,
  getUserById,
  forgotPassword,
  resetPassword
}