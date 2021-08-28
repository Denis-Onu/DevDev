const express = require('express')
const router = express.Router()
const {
  addPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  editComment,
  deleteComment
} = require('../controllers/postController')
const { protect, isPostAuthor, isCommentAuthor } = require('../middleware/authMiddleware')

router.get('/', getPosts)
router.post('/new', protect, addPost)
router.route('/post/:id').get(getPost).put(protect, isPostAuthor, editPost).delete(protect, isPostAuthor, deletePost)
router.put('/like/:id', protect, likePost)
router.put('/unlike/:id', protect, unlikePost)
router.post('/comment/:id', protect, addComment)
router.route('/comments/:postId/:commentId').put(protect, isCommentAuthor, editComment).delete(protect, isCommentAuthor, deleteComment)

module.exports = router