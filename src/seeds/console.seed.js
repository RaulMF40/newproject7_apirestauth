require('dotenv').config()
const mongoose = require('mongoose')
const Console = require('../api/models/consoles')

const consoles = [
  {
    name: 'PlayStation 5',
    releaseYear: 2020,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/PlayStation_5_logo_and_wordmark.svg/1200px-PlayStation_5_logo_and_wordmark.svg.png'
  },
  {
    name: 'Xbox Series X',
    releaseYear: 2020,
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Xbox_Series_X_logo.png'
  },
  {
    name: 'Nintendo Switch',
    releaseYear: 2017,
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Nintendo_Switch_Logo.svg'
  },
  {
    name: 'PlayStation 4',
    releaseYear: 2013,
    img: 'https://www.hatchwise.com/wp-content/uploads/2023/08/playstation-4-logo-1024x576.png'
  },
  {
    name: 'Xbox One',
    releaseYear: 2013,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/X_Box_One_logo.svg/1280px-X_Box_One_logo.svg.png'
  }
]

const consoleDocuments = consoles.map((console) => new Console(console))

const mongoDB =
  'mongodb+srv://gamesproject7:bK4S9CsE9VRyKDda31@cluster0.wubp1ik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    const allConsoles = await Console.find()
    if (allConsoles.length) {
      await Console.collection.drop()
    }
  })
  .catch((err) => {
    console.error(`Error deleting data: ${err}`)
    process.exit(1)
  })
  .then(async () => {
    try {
      await Console.insertMany(consoleDocuments)
    } catch (err) {
      console.error(`Error creating data: ${err}`)
      process.exit(1)
    }
  })
  .finally(() => {
    mongoose
      .disconnect()
      .then(() => {
        console.log('Disconnected from MongoDB')
      })
      .catch((err) => {
        console.error(`Error disconnecting from MongoDB: ${err}`)
      })
  })
