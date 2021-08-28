import { ADD_POST, GET_POST, GET_POSTS, LIKE_POST, UNLIKE_POST, EDIT_POST, DELETE_POST, ADD_COMMENT_ERROR, ADD_COMMENT } from "../constants/postConstants"
import { LOADING, ERROR } from "../constants/globalConstants"
import api from '../utils/api'
import getToken from '../utils/getToken'

export const getPosts = (search, likes, limit) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })

    const { data } = await api.get(`/posts?search=${search ? search : ''}&likes=${likes ? 'true' : 'false'}&limit=${limit}`)

    dispatch({
      type: GET_POSTS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
    alert('Something went wrong')
  }
}

export const addPost = (history, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING
    })

    const { data } = await api.post('/posts/new', formData, {
      headers: {
        'Authorization': `Bearer ${getToken(getState)}`
      }
    })

    dispatch({
      type: ADD_POST
    })

    history.push(`/posts/${data.id}`)
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING
    })

    const { data } = await api.get(`/posts/post/${id}`)

    dispatch({
      type: GET_POST,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
    alert('Something went wrong')
  }
}

export const likePost = (id) => async (dispatch, getState) => {
  try {
    const { data } = await api.put(`/posts/like/${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${getToken(getState)}`
      }
    })

    dispatch({
      type: LIKE_POST,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
    alert('Something went wrong')
  }
}

export const unlikePost = (id) => async (dispatch, getState) => {
  try {
    const { data } = await api.put(`/posts/unlike/${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${getToken(getState)}`
      }
    })

    dispatch({
      type: UNLIKE_POST,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
    alert('Something went wrong')
  }
}

export const editPost = (history, id, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING
    })

    const { data } = await api.put(`/posts/post/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${getToken(getState)}`
      }
    })

    dispatch({
      type: EDIT_POST
    })

    history.push(`/posts/${data.id}`)
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const deletePost = (history, id) => async (dispatch, getState) => {
  try {
    await api.delete(`/posts/post/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken(getState)}`
      }
    })

    dispatch({
      type: DELETE_POST
    })

    history.push('/posts')
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
    alert('Something went wrong')
  }
}

export const addComment = (id, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING
    })

    const { data } = await api.post(`/posts/comment/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${getToken(getState)}`
      }
    })

    dispatch({
      type: ADD_COMMENT,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}