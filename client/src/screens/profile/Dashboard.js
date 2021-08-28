import { useHistory } from 'react-router-dom'
import PrivateRoute from '../../components/PrivateRoute'

import {
  Container,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import PostItem from '../../components/PostItem'

import { useSelector, useDispatch } from 'react-redux'
import { deleteProfile } from '../../actions/profileActions'

const Dashboard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const profile = useSelector(state => state.profileReducer.profile)

  const deleteProfileHandler = () => {
    dispatch(deleteProfile(history))
  }

  return (
    <PrivateRoute>
      <Container maxWidth='md' className={classes.container}>

        {profile ? (
          <Card>
            <CardContent>
              <ListItem className={classes.userInfo}>
                <ListItemAvatar>
                  <Avatar alt={profile.name} src={process.env.REACT_APP_SERVER_URL + profile.avatar} />
                </ListItemAvatar>
                <ListItemText secondary={`Joined on ${new Intl.DateTimeFormat().format(new Date(profile.createdAt))}`}>
                  <Typography variant='h6' noWrap={true}>{profile.name}</Typography>
                </ListItemText>
                <IconButton href='/dashboard/edit'>
                  <EditIcon />
                </IconButton>
              </ListItem>
              <Divider />

              <Box my={3}>
                <Typography variant='h5' gutterBottom>Posts</Typography>
                {profile.posts && <Grid container spacing={2}>
                  {profile.posts.map(post => (
                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12} key={post._id}>
                      <PostItem
                        id={post._id}
                        username={profile.name}
                        useravatar={process.env.REACT_APP_SERVER_URL + profile.avatar}
                        date={new Intl.DateTimeFormat().format(new Date(post.createdAt))}
                        image={process.env.REACT_APP_SERVER_URL + post.image}
                        title={post.title}
                        likes={post.likes.length}
                      />
                    </Grid>
                  ))}
                </Grid>}
              </Box>

              <Button
                onClick={deleteProfileHandler}
                endIcon={<DeleteIcon />}
                variant='contained'
                color='secondary'
              >
                Delete profile
              </Button>
            </CardContent>
          </Card>
        ) : <CircularProgress />}
      </Container>
    </PrivateRoute>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 35
  },
  userInfo: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }
}))


export default Dashboard
