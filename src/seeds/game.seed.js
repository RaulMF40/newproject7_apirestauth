require('dotenv').config()
const mongoose = require('mongoose')
const mongoDB =
  'mongodb+srv://gamesproject7:bK4S9CsE9VRyKDda31@cluster0.wubp1ik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const Game = require('../api/models/games')

const games = [
  {
    title: 'The Witcher 3: Wild Hunt',
    releaseYear: 2015,
    img: 'witcher3.jpg',
    platform: []
  },
  {
    title: 'Persona 5 Royal',
    releaseYear: 2019,
    img: 'persona5.jpg',
    platform: []
  },
  {
    title: 'Bloodborne',
    releaseYear: 2015,
    img: 'bloodborne.jpg',
    platform: []
  },
  {
    title: 'God of War (2018)',
    releaseYear: 2018,
    img: 'godofwar.jpg',
    platform: []
  },
  {
    title: 'The Last of Us Part II',
    releaseYear: 2020,
    img: 'thelastofus2.jpg',
    platform: []
  },
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    releaseYear: 2017,
    img: 'zelda.jpg',
    platform: []
  },
  {
    title: 'Super Mario Odyssey',
    releaseYear: 2017,
    img: 'mario.jpg',
    platform: []
  },
  {
    title: 'Red Dead Redemption 2',
    releaseYear: 2018,
    img: 'rdr2.jpg',
    platform: []
  }
]

const gameDocuments = games.map((game) => new Game(game))

console.log(mongoDB)

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    const allGames = await Games.find()

    if (allGames.length) {
      await Games.collection.drop()
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Game.insertMany(gameDocuments)
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect())
