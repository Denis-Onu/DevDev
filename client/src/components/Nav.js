import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider
} from "@material-ui/core"

import MenuIcon from '@material-ui/icons/Menu'
import DescriptionIcon from '@material-ui/icons/Description'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import { Link, useHistory } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { logout } from "../actions/authActions"

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const token = useSelector(state => state.authReducer.token)
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <AppBar position='fixed' color='inherit' className={classes.root} elevation={1}>
      <Toolbar>
        <Typography className={classes.title} variant='h5'>
          <Link className={classes.link} to='/'>
            DevDev
          </Link>
        </Typography>

        {!isMobile ? (
          <>
            <Typography variant='button' className={classes.navItem}>
              <Link className={classes.link} to='/posts'>
                Posts
              </Link>
            </Typography>
            <Typography variant='button' className={classes.navItem}>
              <Link className={classes.link} to={token ? '/dashboard' : '/login'}>
                {token ? 'Profile' : 'Login'}
              </Link>
            </Typography>
            <Typography variant='button' className={classes.navItem}>
              {token ? <Link onClick={handleLogout} to='#' className={classes.link}>
                Logout
              </Link> : (
                <Link className={classes.link} to='/signup'>
                  Signup
                </Link>
              )}
            </Typography>
          </>
        ) : (
          <>
            <IconButton onClick={() => setNavOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor='right' open={navOpen} onClose={() => setNavOpen(false)}>
              <List className={classes.list}>
                <Link className={classes.link} to='/posts'>
                  <ListItem className={classes.listItem} onClick={() => setNavOpen(false)} button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary='Posts' />
                  </ListItem>
                </Link>
                <Divider />

                <Link className={classes.link} to={token ? '/dashboard' : '/login'}>
                  <ListItem className={classes.listItem} onClick={() => setNavOpen(false)} button>
                    <ListItemIcon>
                      {token ? <AccountCircleIcon /> : <ExitToAppIcon />}
                    </ListItemIcon>
                    <ListItemText primary={token ? 'Profile' : 'Login'} />
                  </ListItem>
                </Link>
                <Divider />


                {token ? (
                  <ListItem className={classes.listItem} onClick={() => {
                    setNavOpen(false)
                    handleLogout()
                  }} button>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                  </ListItem>
                ) : (
                  <Link className={classes.link} to='/signup'>
                    <ListItem className={classes.listItem} onClick={() => setNavOpen(false)} button>
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary='Signup' />
                    </ListItem>
                  </Link>
                )}
                <Divider />
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  navItem: {
    margin: theme.spacing(0, 1.5, 0, 1.5)
  },
  list: {
    width: 250
  },
  listItem: {
    padding: 15
  }
}))

export default Nav
