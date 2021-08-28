import { useState } from 'react'
import GuestRoute from '../../components/GuestRoute'

import {
  Container,
  Card,
  CardContent,
  LinearProgress,
  Typography,
  TextField,
  Button
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import formStyles from '../../styles/formStyles'

import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../actions/authActions'

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState()
  const classes = formStyles()
  const dispatch = useDispatch()
  const error = useSelector(state => state.authReducer.error)
  const message = useSelector(state => state.authReducer.msg)
  const loading = useSelector(state => state.authReducer.loading)

  const submitHandler = e => {
    e.preventDefault()
    dispatch(resetPassword(password, match.params.token))
  }

  return (
    <GuestRoute>
      <Container maxWidth='sm'>
        <Card className={classes.card}>
          {loading && <LinearProgress />}
          <CardContent>
            <Typography variant='h5' className={classes.title} align='center'>Reset Password</Typography>
            {error && <Alert severity='error'>{error}</Alert>}
            {message && <Alert severity='info'>{message}</Alert>}
            <form onSubmit={submitHandler}>
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='Password'
                type='password'
                name='password'
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </form>
            <Button className={classes.button} variant='contained' color='primary' type='submit' fullWidth>Submit</Button>
          </CardContent>
        </Card>
      </Container>
    </GuestRoute>
  )
}

export default ResetPassword
