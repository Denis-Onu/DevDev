const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const { v4 } = require('uuid')

const { notFound, errorHandler } = require('./server/middleware/errorMiddleware')
const userRoutes = require('./server/routes/userRoutes')
const postRoutes = require('./server/routes/postRoutes')
const connectDB = require('./server/config/db')
const throwError = require('./server/utils/throwError')

const app = express()

dotenv.config()
connectDB()
app.use(express.json())
app.use(fileUpload())
app.use(cors({
  origin: process.env.CLIENT_URL
}))

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.post('/upload', (req, res) => {

  if (!req.files) {
    throwError(res, 'No file uploaded', 400)
  }

  const file = req.files.file

  const fileName = v4() + file.name

  file.mv(`${__dirname}/uploads/${fileName}`, err => {
    if (err) {
      console.log(err)
      throwError(res, err, 500)
    }

    res.json({ fileName, filePath: `/uploads/${fileName}` })
  })
})

app.use('/users', userRoutes)
app.use('/posts', postRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server on port ${PORT}`))