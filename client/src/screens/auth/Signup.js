import { useState, useEffect } from 'react'
import GuestRoute from '../../components/GuestRoute'

import {
  Container,
  Card,
  CardContent,
  LinearProgress,
  Typography,
  TextField,
  Button,
  Link
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import formStyles from '../../styles/formStyles'

import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../actions/authActions'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const classes = formStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const error = useSelector(state => state.authReducer.error)
  const loading = useSelector(state => state.authReducer.loading)
  const token = useSelector(state => state.authReducer.token)

  useEffect(() => {
    if (token) {
      history.push('/dashboard')
    }
  }, [history, token])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(signup(formData))
  }

  const changeField = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <GuestRoute>
      <Container maxWidth='sm'>
        <Card className={classes.card}>
          {loading && <LinearProgress />}
          <CardContent>
            <Typography variant='h4' className={classes.title} align='center'>Signup</Typography>
            {error && <Alert severity='error'>{error}</Alert>}
            <form onSubmit={submitHandler}>
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='Name'
                name='name'
                onChange={changeField}
                value={formData.name}
              />
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='Email'
                type='email'
                name='email'
                onChange={changeField}
                value={formData.email}
              />
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='Password'
                type='password'
                name='password'
                onChange={changeField}
                value={formData.password}
              />
              <Button className={classes.button} variant='contained' color='primary' type='submit' fullWidth>Submit</Button>
            </form>
            <Typography className={classes.link} align='center' variant='body1'>
              Already have an account? <Link href='/login'>Login</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </GuestRoute>
  )
}

export default Signup
