const asyncHandler = require('express-async-handler')
const Post = require('../models/Post')
const throwError = require('../utils/throwError')
const fs = require('fs')

const addPost = asyncHandler(async (req, res) => {
  const { title, image, body } = req.body

  if (!title || !image || !body) {
    throwError(res, 'Please fill in all the fields', 400)
  }

  const post = await Post.create({
    user: req.userId,
    title,
    image,
    body
  })
  res.json({
    id: post._id,
    user: post.user,
    title: post.title,
    image: post.image,
    body: post.body,
    comments: post.comments,
    createdAt: post.createdAt,
    likes: post.likes
  })
})

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('comments.user', ['name', 'avatar']).populate('user', ['name', 'avatar'])

  if (!post) {
    throwError(res, 'Post not found', 404)
  }

  res.json({
    id: post._id,
    user: post.user,
    title: post.title,
    image: post.image,
    body: post.body,
    comments: post.comments,
    createdAt: post.createdAt,
    likes: post.likes
  })
})

const getPosts = asyncHandler(async (req, res) => {
  const { limit, search, likes } = req.query


  let posts

  if (likes && likes === 'true') {
    posts = await Post.find({ title: { $regex: search || '', $options: 'i' } })
      .populate('user', ['name', 'avatar'])
      .limit(parseFloat(limit))
      .sort({ likes: -1 })
  } else {
    posts = await Post.find({ title: { $regex: search || '', $options: 'i' } })
      .populate('user', ['name', 'avatar'])
      .limit(parseFloat(limit))
      .sort({ createdAt: -1 })
  }

  res.json(posts)
})

const editPost = asyncHandler(async (req, res) => {
  const { title, image, body } = req.body
  const post = await Post.findById(req.params.id)

  post.title = title || post.title
  post.body = body || post.body


  if (image) {
    fs.unlink(process.env.PWD + post.image, err => {
      if (err) {
        console.log(err)
        return
      }
    })
    post.image = image || post.image
  }

  const editedPost = await post.save()
  res.json({
    id: editedPost._id,
    user: editedPost.user,
    title: editedPost.title,
    image: editedPost.image,
    body: editedPost.body,
    comments: editedPost.comments,
    createdAt: editedPost.createdAt,
    likes: editedPost.likes
  })
})

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post.image) {
    fs.unlink(process.env.PWD + post.image, err => {
      if (err) {
        console.log(err)
        return
      }
    })
  }

  await post.remove()
  res.json({
    msg: 'Post successfully deleted'
  })
})

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    throwError(res, 'Post not found', 404)
  }

  const existingLike = post.likes.find(like => like.toString() === req.userId.toString())

  if (existingLike) {
    throwError(res, 'You can like posts only once', 400)
  }

  post.likes.push(req.userId)

  let likedPost = await post.save()
  likedPost = await likedPost.populate('comments.user', ['name', 'avatar']).populate('user', ['name', 'avatar']).execPopulate()


  res.json({
    id: likedPost._id,
    user: likedPost.user,
    title: likedPost.title,
    image: likedPost.image,
    body: likedPost.body,
    comments: likedPost.comments,
    createdAt: likedPost.createdAt,
    likes: likedPost.likes
  })
})

const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    throwError(res, 'Post not found', 404)
  }

  post.likes = post.likes.filter(like => like.toString() !== req.userId.toString())

  let unlikedPost = await post.save()
  unlikedPost = await unlikedPost.populate('comments.user', ['name', 'avatar']).populate('user', ['name', 'avatar']).execPopulate()

  res.json({
    id: unlikedPost._id,
    user: unlikedPost.user,
    title: unlikedPost.title,
    image: unlikedPost.image,
    body: unlikedPost.body,
    comments: unlikedPost.comments,
    createdAt: unlikedPost.createdAt,
    likes: unlikedPost.likes
  })
})

module.exports = {
  addPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
  likePost,
  unlikePost,
}