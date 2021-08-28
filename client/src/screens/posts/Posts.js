import { useState, useEffect, useRef } from 'react'

import {
  Container,
  Box,
  Grid,
  Button,
  Divider,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  makeStyles,
  CircularProgress,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import LoopIcon from '@material-ui/icons/Loop'
import formStyles from '../../styles/formStyles'
import PostItem from '../../components/PostItem'

import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/postActions'

const Posts = () => {
  const [limit, setLimit] = useState(4)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('recent')
  const dispatch = useDispatch()
  const classes = useStyles()
  const formClasses = formStyles()
  const loading = useSelector(state => state.postReducer.loading)
  const posts = useSelector(state => state.postReducer.posts)
  const scrollRef = useRef()

  useEffect(() => {
    dispatch(getPosts('', false, limit))
  }, [])

  const searchHandler = e => {
    e.preventDefault()
    setLimit(4)
    dispatch(getPosts(search, filter === 'likes' ? true : false, 4))
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChangeFilter = e => {
    setFilter(e.target.value)
    setLimit(4)
    dispatch(getPosts(search, filter === 'likes' ? true : false, 4))
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const loadMorePosts = () => {
    setLimit(limit + 4)
    dispatch(getPosts(search, filter === 'likes' ? true : false, limit + 4))
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Container maxWidth='xl'>
      <div className={classes.toolbar}></div>
      <Grid container className={classes.content} spacing={3}>
        <Grid item lg={3} md={4} sm={12} xs={12}>
          <Box p={2} boxShadow={1} className={classes.container}>
            <Typography variant='h6' gutterBottom>Search Posts</Typography>
            <Divider />
            <form onSubmit={searchHandler}>
              <TextField
                className={formClasses.input}
                variant='outlined'
                label='Search'
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Button
                type='submit'
                className={classes.searchButton}
                variant='contained'
                color='primary'
                fullWidth
              >
                Search
              </Button>
            </form>
            <Typography variant='h6' gutterBottom>Filter Posts</Typography>
            <Divider />
            <Box mb={3}>
              <FormControl component="fieldset">
                <RadioGroup aria-label="filter" name="filter1" value={filter} onChange={handleChangeFilter}>
                  <FormControlLabel value="recent" control={<Radio color='primary' />} label="Recently Posted" />
                  <FormControlLabel value="likes" control={<Radio color='primary' />} label="Most Liked" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button endIcon={<AddIcon />} variant='contained' fullWidth color='primary' href='/posts/new'>Add a Post</Button>
          </Box>
        </Grid>

        {!loading ? <Grid item lg={9} md={8} sm={12} xs={12}>
          <Grid ref={scrollRef} container className={classes.posts} spacing={3}>

            {posts && posts.map(post => (
              <Grid item xl={3} lg={4} md={6} sm={6} xs={12} key={post._id}>
                <PostItem
                  id={post._id}
                  username={post.user ? post.user.name : "This account was deleted"}
                  useravatar={post.user && process.env.REACT_APP_SERVER_URL + post.user.avatar}
                  date={new Intl.DateTimeFormat().format(new Date(post.createdAt))}
                  image={process.env.REACT_APP_SERVER_URL + post.image}
                  title={post.title}
                  likes={post.likes.length}
                />
              </Grid>
            ))}
          </Grid>
          <Button onClick={loadMorePosts} variant='contained' color='primary' endIcon={<LoopIcon />}>Load more posts</Button>
        </Grid> : <CircularProgress />}
      </Grid>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: 25
  },
  searchButton: {
    marginBottom: 25
  },
  title: {
    fontWeight: 'bold'
  },
  container: {
    background: '#fff'
  },
  posts: {
    marginBottom: 10
  }
}))

export default Posts
