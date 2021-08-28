import {
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  ADD_POST, DELETE_POST, EDIT_POST, GET_POST, GET_POSTS, LIKE_POST, UNLIKE_POST
} from '../constants/postConstants'
import { ERROR, LOADING, CLEAR_ERRORS } from '../constants/globalConstants'
import { GET_PROFILE } from '../constants/profileConstants'

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }

    case ERROR:
      return { ...state, loading: false, error: action.payload }

    case GET_POSTS:
      return { ...state, loading: false, posts: action.payload }

    case ADD_POST:
      return { ...state, loading: false, error: null }

    case CLEAR_ERRORS:
      return { ...state, loading: false, error: null }

    case GET_PROFILE:
      return { ...state, loading: false, error: null }

    case GET_POST:
      return { ...state, loading: false, error: null, post: action.payload }

    case LIKE_POST:
      return { ...state, loading: false, error: null, post: action.payload }

    case UNLIKE_POST:
      return { ...state, loading: false, error: null, post: action.payload }

    case EDIT_POST:
      return { ...state, loading: false, error: null }

    case DELETE_POST:
      return { ...state, loading: false, error: null, post: null }

    case ADD_COMMENT:
      return { ...state, loading: false, error: null, post: action.payload }

    case ADD_COMMENT_ERROR:
      return { ...state, loading: false, error: null, commentError: action.payload }

    default:
      return state
  }
}

export default postReducer