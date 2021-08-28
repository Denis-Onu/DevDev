import { useState } from 'react'
import GuestRoute from '../../components/GuestRoute'

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  LinearProgress
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import formStyles from '../../styles/formStyles'

import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../actions/authActions'


const ForgotPassword = () => {
  const [email, setEmail] = useState()
  const classes = formStyles()
  const dispatch = useDispatch()
  const error = useSelector(state => state.authReducer.error)
  const message = useSelector(state => state.authReducer.msg)
  const loading = useSelector(state => state.authReducer.loading)

  const submitHandler = e => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  return (
    <GuestRoute>
      <Container maxWidth='sm'>
        <Card className={classes.card}>
          {loading && <LinearProgress />}
          <CardContent>
            <Typography variant='h5' className={classes.title} align='center'>Forgot Password</Typography>
            {error && <Alert severity='error'>{error}</Alert>}
            {message && <Alert severity='info'>{message}</Alert>}
            <form onSubmit={submitHandler}>
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='Email'
                type='email'
                name='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              <Button className={classes.button} variant='contained' color='primary' type='submit' fullWidth>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </GuestRoute>
  )
}

export default ForgotPassword
