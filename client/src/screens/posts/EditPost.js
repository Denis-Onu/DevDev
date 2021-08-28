import { useState } from 'react'
import PrivateRoute from '../../components/PrivateRoute'
import api from '../../utils/api'
import { useHistory } from 'react-router-dom'

import {
  Container,
  Card,
  Box,
  CardContent,
  Typography,
  TextField,
  Button,
  LinearProgress
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import formStyles from '../../styles/formStyles'

import { useDispatch, useSelector } from 'react-redux'
import { editPost } from '../../actions/postActions'


const EditPost = ({ match }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    body: ''
  })

  const classes = formStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const loading = useSelector(state => state.postReducer.loading)
  const error = useSelector(state => state.postReducer.error)

  const submitHandler = async e => {
    e.preventDefault()

    if (formData.image) {
      const fileForm = new FormData()
      fileForm.append('file', formData.image)

      try {
        const { data } = await api.post('/upload', fileForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        dispatch(editPost(history, match.params.id, {
          title: formData.title,
          image: data.filePath,
          body: formData.body
        }))
      } catch (error) {
        if (error.response.status === 500) {
          alert('Could not upload file to the server')
        } else {
          alert(error.response.data.message)
        }
      }
    } else {
      dispatch(editPost(history, match.params.id, {
        title: formData.title,
        body: formData.body,
      }))
    }

  }

  const changeFile = e => {
    setFormData({ ...formData, image: e.target.files[0] })
  }


  const changeField = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <PrivateRoute>
      <Container maxWidth='sm'>
        <Card className={classes.card}>
          {loading && <LinearProgress />}
          <CardContent>
            <Typography variant='h5' className={classes.title} align='center'>Edit Post</Typography>
            {error && <Alert severity='error'>{error}</Alert>}
            <Typography variant='body1' color='textSecondary'>Leave blank to keep the same</Typography>
            <form onSubmit={submitHandler}>
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='Title'
                type='text'
                name='title'
                onChange={changeField}
                value={formData.title}
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
                  <Typography variant='body1' style={{ marginBottom: 5 }} display='block'>Image</Typography>
                  <Button variant="contained" color='primary' component="span" endIcon={<PhotoCameraIcon />}>
                    Upload
                  </Button>
                  {formData.image && formData.image.name && (
                    <Typography
                      variant='subtitle1'
                      display='inline'
                      style={{ marginLeft: '10px' }}
                    >
                      {formData.image.name}
                    </Typography>
                  )}
                </label>
              </Box>
              <TextField
                variant='outlined'
                fullWidth
                className={classes.input}
                label='Body'
                type='text'
                name='body'
                multiline
                minRows={5}
                onChange={changeField}
                value={formData.body}
              />
              <Button className={classes.button} variant='contained' color='primary' type='submit' fullWidth>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </PrivateRoute>
  )
}

export default EditPost
