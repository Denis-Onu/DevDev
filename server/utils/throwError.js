const throwError = (res, error, code) => {
  res.status(code)
  throw new Error(error)
}

module.exports = throwError