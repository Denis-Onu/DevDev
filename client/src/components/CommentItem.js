import {
  Box,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  makeStyles
} from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { useSelector } from 'react-redux'

const CommentItem = (props) => {
  const classes = useStyles()

  const user = useSelector(state => state.profileReducer.profile)

  return (
    <Box mb={3}>
      <Card>
        <CardContent>
          <Box display='flex' alignItems='center'>
            <ListItem className={classes.user}>
              <ListItemAvatar>
                <Avatar src={process.env.REACT_APP_SERVER_URL + props.avatar} alt={props.name} />
              </ListItemAvatar>
              <ListItemText primary={props.name} secondary={new Intl.DateTimeFormat().format(new Date(props.date))} />
            </ListItem>

            {user && user.id === props.userId && <>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </>}
          </Box>

          <Typography variant='body1'>{props.body}</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  user: {
    paddingLeft: 0
  }
}))

export default CommentItem