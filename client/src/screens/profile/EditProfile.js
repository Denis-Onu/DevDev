import { useState } from "react"
import { useHistory } from "react-router"
import PrivateRoute from "../../components/PrivateRoute"
import api from '../../utils/api'

import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  LinearProgress
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import formStyles from '../../styles/formStyles'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'

import { useDispatch, useSelector } from 'react-redux'
import { editProfile } from "../../actions/profileActions"

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    avatar: null,
    newPassword: '',
    currentPassword: ''
  })

  const classes = formStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const loading = useSelector(state => state.profileReducer.loading)
  const error = useSelector(state => state.profileReducer.error)

  const submitHandler = async e => {
    e.preventDefault()

    if (formData.avatar) {
      const fileForm = new FormData()
      fileForm.append('file', formData.avatar)

      try {
        const { data } = await api.post('/upload', fileForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        dispatch(editProfile(history, {
          name: formData.name,
          avatar: data.filePath,
          newPassword: formData.newPassword,
          currentPassword: formData.currentPassword
        }))
      } catch (error) {
        if (error.response.status === 500) {
          alert('Could not upload file to the server')
        } else {
          alert(error.response.data.message)
        }
      }
    } else {
      dispatch(editProfile(history, {
        name: formData.name,
        newPassword: formData.newPassword,
        currentPassword: formData.currentPassword
      }))
    }

  }

  const changeFile = e => {
    setFormData({ ...formData, avatar: e.target.files[0] })
  }

  const changeField = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <PrivateRoute>
      <Container maxWidth='sm'>
        <Card className={classes.card}>
          {loading && <LinearProgress />}
          <CardContent>
            <Typography variant='h5' className={classes.title} align='center'>Edit Profile</Typography>
            {error && <Alert severity='error'>{error}</Alert>}
            <Typography variant='body1' color='textSecondary'>Leave blank to keep the same</Typography>
            <form onSubmit={submitHandler}>
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='Name'
                type='text'
                name='name'
                onChange={changeField}
                value={formData.name}
              />
              <Box className={classes.input}>
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  name='avatar'
                  onChange={changeFile}
                />
                <label htmlFor="raised-button-file">
                  <Typography variant='body1' style={{ marginBottom: 5 }} display='block'>Avatar</Typography>
                  <Button variant="contained" color='primary' component="span" endIcon={<PhotoCameraIcon />}>
                    Upload
                  </Button>
                  {formData.avatar && formData.avatar.name && (
                    <Typography
                      variant='subtitle1'
                      display='inline'
                      style={{ marginLeft: '10px' }}
                    >
                      {formData.avatar.name}
                    </Typography>
                  )}
                </label>
              </Box>
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='New Password'
                type='password'
                name='newPassword'
                onChange={changeField}
                value={formData.newPassword}
              />
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='Current Password (required)'
                type='password'
                name='currentPassword'
                onChange={changeField}
                value={formData.currentPassword}
              />
              <Button className={classes.button} variant='contained' color='primary' type='submit' fullWidth>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </PrivateRoute>
  )
}

export default EditProfile
