const getToken = (getState) => {
  const { authReducer: { token } } = getState()
  return token
}

export default getToken