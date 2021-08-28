import {
  FORGOT_PASSWORD,
  LOGOUT,
  RESET_PASSWORD,
  USER_LOGIN,
  USER_SIGNUP,
} from '../constants/authConstants'
import { LOADING, ERROR, CLEAR_ERRORS } from '../constants/globalConstants'
import { GET_PROFILE } from '../constants/profileConstants'

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }

    case USER_SIGNUP:
      return { ...state, token: action.payload, loading: false, error: null }

    case USER_LOGIN:
      return { ...state, token: action.payload, loading: false, error: null }

    case FORGOT_PASSWORD:
      return { ...state, loading: false, msg: action.payload, error: null }

    case RESET_PASSWORD:
      return { ...state, loading: false, msg: action.payload, error: null }

    case LOGOUT:
      return { ...state, loading: false, error: null, token: null }

    case ERROR:
      return { ...state, loading: false, error: action.payload }

    case CLEAR_ERRORS:
      return { ...state, error: null, loading: false, msg: null }

    case GET_PROFILE:
      return { ...state, loading: false, error: null }

    default:
      return state
  }
}


export default authReducer