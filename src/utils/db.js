const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('DB is FULL POWER! 💻')
  } catch (error) {
    console.log('DB is BROKEN 🤬😡')
  }
}

module.exports = { connectDB }
