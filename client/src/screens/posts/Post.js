import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CommentItem from '../../components/CommentItem'

import {
  Container,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  makeStyles,
  TextField,
  Button
} from '@material-ui/core'
import formStyles from '../../styles/formStyles'
import Alert from '@material-ui/lab/Alert'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'

import { useDispatch, useSelector } from 'react-redux'
import { getPost, likePost, unlikePost, deletePost, addComment } from '../../actions/postActions'

const Post = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const loading = useSelector(state => state.postReducer.loading)
  const post = useSelector(state => state.postReducer.post)
  const user = useSelector(state => state.profileReducer.profile)

  useEffect(() => {
    dispatch(getPost(match.params.id))
  }, [])
  return (
    <Container maxWidth='md' className={classes.container}>
      <div className={classes.toolbar}></div>

      {!loading && post ? <>
        <Card>
          <CardContent>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Box>
                <Typography variant='h6'>{post.title}</Typography>
              </Box>
              <Box>
                {user && user.id === post.user._id &&
                  <>
                    <IconButton href={`/posts/edit/${post.id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => dispatch(deletePost(history, post.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              </Box>
            </Box>
            <Box my={1}>
              <ListItem className={classes.profile}>
                <ListItemIcon>
                  <Avatar src={post.user && process.env.REACT_APP_SERVER_URL + post.user.avatar} alt={post.user && post.user.name} />
                </ListItemIcon>
                <ListItemText primary={post.user ? post.user.name : "This account was deleted"} secondary={new Intl.DateTimeFormat().format(new Date(post.createdAt))} />
              </ListItem>
            </Box>
            <Typography gutterBottom>
              {post.body}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton disabled={!user || post.likes.find(like => like === user.id)} onClick={() => dispatch(likePost(post.id))}>
              <ThumbUpAltIcon />
            </IconButton>
            <Typography variant='button'>{post.likes.length}</Typography>
            <IconButton disabled={!user || !post.likes.find(like => like === user.id)} onClick={() => dispatch(unlikePost(post.id))}>
              <ThumbDownIcon />
            </IconButton>
          </CardActions>
        </Card>
      </> : <CircularProgress />}
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  container: {
    marginTop: 25
  },
  profile: {
    paddingLeft: 0,
    width: 'fit-content'
  },
}))

export default Post
