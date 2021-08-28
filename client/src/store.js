import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import authReducer from './reducers/authReducer'
import profileReducer from './reducers/profileReducer'
import postReducer from './reducers/postReducer'

const reducer = combineReducers({
  authReducer,
  profileReducer,
  postReducer
})


const userToken = JSON.parse(localStorage.getItem('usrtkn')) ? JSON.parse(localStorage.getItem('usrtkn')) : null

const initialState = {
  authReducer: {
    token: userToken
  }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store