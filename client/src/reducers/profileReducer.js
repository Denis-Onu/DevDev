import {
  GET_PROFILE,
  EDIT_PROFILE,
  DELETE_PROFILE
} from '../constants/profileConstants'
import { ERROR, LOADING, CLEAR_ERRORS } from '../constants/globalConstants'

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }

    case GET_PROFILE:
      return { ...state, loading: false, profile: action.payload }

    case EDIT_PROFILE:
      return { ...state, loading: false, error: null }

    case DELETE_PROFILE:
      return { ...state, loading: false, error: null, profile: null }

    case ERROR:
      return { ...state, loading: false, error: action.payload }

    case CLEAR_ERRORS:
      return { ...state, loading: false, error: null }


    default:
      return state
  }
}

export default profileReducer