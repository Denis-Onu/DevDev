const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })

    console.log('MongoDB connected')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectDB