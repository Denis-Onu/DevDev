import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Box,
  Avatar,
  Typography,
  makeStyles
} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'

import { Link } from 'react-router-dom'

const PostItem = (props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt='User' src={props.useravatar} />}
        title={props.username}
        subheader={props.date}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
      />
      <CardContent>
        <Link className={classes.title} to={`/posts/${props.id}`}>
          <Typography gutterBottom variant='h6' noWrap={true}>{props.title}</Typography>
        </Link>
        <Box mt={3} display='flex' alignItems='center'>
          <ThumbUpAltIcon className={classes.icon} color='action' />
          <Typography variant='button'>{props.likes}</Typography>
          <ThumbDownIcon className={classes.icon} color='action' />
        </Box>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  icon: {
    margin: theme.spacing(0, 1, 0, 1),
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

export default PostItem
