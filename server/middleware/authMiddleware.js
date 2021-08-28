const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')
const asyncHandler = require('express-async-handler')
const throwError = require('../utils/throwError')

const protect = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id)

      if (!user) {
        throwError(res, 'User not found', 404)
      }

      req.userId = user._id
      next()
    } catch (error) {
      throwError(res, 'Not authorized, token failed', 401)
    }
  } else {
    throwError(res, 'Not authorized, no token', 401)
  }
})

const isPostAuthor = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    throwError(res, 'Post not found', 404)
  }

  if (post.user.toString() === req.userId.toString()) {
    next()
  } else {
    throwError(res, 'You are not the author of this post', 401)
  }
})

const isCommentAuthor = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId)
  const comment = post.comments.find(comment => comment._id.toString() === req.params.commentId.toString())

  if (!post) {
    throwError(res, 'Post not found', 404)
  }

  if (!comment) {
    throwError(res, 'Comment not found', 404)
  }

  if (comment.user.toString() === req.userId.toString()) {
    next()
  } else {
    throwError(res, 'You are not the author of this comment', 401)
  }
})

module.exports = { protect, isPostAuthor, isCommentAuthor }