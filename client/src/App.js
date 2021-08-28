import { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {
  ThemeProvider,
  createTheme
} from '@material-ui/core'

import Nav from './components/Nav'
import NotFound from './screens/NotFound'

import Home from './screens/Home'
import Signup from './screens/auth/Signup'
import Login from './screens/auth/Login'
import ForgotPassword from './screens/auth/ForgotPassword'
import ResetPassword from './screens/auth/ResetPassword'
import Dashboard from './screens/profile/Dashboard'
import EditProfile from './screens/profile/EditProfile'
import Posts from './screens/posts/Posts'
import AddPost from './screens/posts/AddPost'
import Post from './screens/posts/Post'
import EditPost from './screens/posts/EditPost'

import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from './actions/profileActions'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1366f2'
    }
  }
})

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)

  useEffect(() => {
    if (token) {
      dispatch(getProfile())
    }
  }, [token])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Nav />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/reset-password/:token' component={ResetPassword} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/dashboard/edit' component={EditProfile} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/posts/new' component={AddPost} />
          <Route exact path='/posts/:id' component={Post} />
          <Route exact path='/posts/edit/:id' component={EditPost} />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;