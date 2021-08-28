import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CLEAR_ERRORS } from '../constants/globalConstants'

const PrivateRoute = (props) => {
  const classes = useStyles()
  const token = useSelector(state => state.authReducer.token)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!token) {
      history.push('/login')
    }
  }, [token])

  useEffect(() => {
    dispatch({ type: CLEAR_ERRORS })
  }, [])

  return (
    <>
      <div className={classes.toolbar}></div>
      {props.children}
    </>
  )
}

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}))

export default PrivateRoute
