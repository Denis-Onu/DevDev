import {
  FORGOT_PASSWORD,
  LOGOUT,
  RESET_PASSWORD,
  USER_LOGIN,
  USER_SIGNUP,
} from '../constants/authConstants'
import { ERROR, LOADING } from '../constants/globalConstants'
import api from '../utils/api'

export const signup = (formData) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })

    const { data } = await api.post('/users/register', formData)

    dispatch({
      type: USER_SIGNUP,
      payload: data.token
    })

    localStorage.setItem('usrtkn', JSON.stringify(data.token))
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const login = (formData) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })

    const { data } = await api.post('/users/login', formData)

    dispatch({
      type: USER_LOGIN,
      payload: data.token
    })

    localStorage.setItem('usrtkn', JSON.stringify(data.token))
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const forgotPassword = (email) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })

    const { data } = await api.post('/users/forgot-password', { email })

    dispatch({
      type: FORGOT_PASSWORD,
      payload: data.msg
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

export const resetPassword = (password, token) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })

    await api.post(`/users/reset-password/${token}`, { password })

    dispatch({
      type: RESET_PASSWORD,
      payload: 'Password reseted. Please try login with your new password'
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

export const logout = () => async dispatch => {
  localStorage.removeItem('usrtkn')

  dispatch({
    type: LOGOUT
  })
}