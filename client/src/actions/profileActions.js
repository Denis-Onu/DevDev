import {
  GET_PROFILE,
  EDIT_PROFILE,
  DELETE_PROFILE,
} from '../constants/profileConstants'
import { LOGOUT } from '../constants/authConstants'
import { ERROR, LOADING } from '../constants/globalConstants'
import api from '../utils/api'
import getToken from '../utils/getToken'

export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING
    })

    const { data } = await api.get('/users/profile', {
      headers: {
        'Authorization': `Bearer ${getToken(getState)}`
      }
    })

    dispatch({
      type: GET_PROFILE,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const editProfile = (history, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING
    })

    await api.put('/users/profile', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken(getState)}`
      }
    })

    dispatch({
      type: EDIT_PROFILE,
    })

    history.push('/dashboard')
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const deleteProfile = (history) => async (dispatch, getState) => {
  try {
    if (window.confirm('Are you sure? This cannot be undone!')) {
      dispatch({
        type: LOADING
      })

      await api.delete('/users/profile', {
        headers: {
          'Authorization': `Bearer ${getToken(getState)}`
        }
      })


      dispatch({
        type: DELETE_PROFILE
      })
      dispatch({
        type: LOGOUT
      })

      localStorage.removeItem('usrtkn')
      history.push('/')
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
    alert('Something went wrong. Come back later.')
  }
}