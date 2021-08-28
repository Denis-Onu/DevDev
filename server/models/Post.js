const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post