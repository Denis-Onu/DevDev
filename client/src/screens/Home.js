import {
  Container,
  Button,
  makeStyles,
  Typography
} from '@material-ui/core'

const Home = () => {
  const classes = useStyles()

  return (
    <Container className={classes.root} maxWidth='md'>

      <Typography gutterBottom align='center' variant='h4' className={classes.title}>
        A Blog Dedicated for Developers
      </Typography>

      <Typography gutterBottom align='center' variant='body1' className={classes.description}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit nobis unde, consectetur quaerat possimus placeat aspernatur quae animi error non repudiandae vero libero ipsum dolorem!
      </Typography>
      <Button href='/signup' size='large' variant='contained' color='primary'>
        Get started
      </Button>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontWeight: 'bold'
  },
  description: {
    lineHeight: 2,
    [theme.breakpoints.up('sm')]: {
      fontSize: 20
    }
  }
}))

export default Home
