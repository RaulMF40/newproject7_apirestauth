const { isLogedIn, isAdmin } = require('../../middlewares/auth')
const {
  addGame,
  getGames,
  editGame,
  deleteGame
} = require('../controllers/games')

const gameRoutes = require('express').Router()

gameRoutes.post('/add', [isLogedIn], addGame)
gameRoutes.get('/', getGames)
gameRoutes.put('/:id', [isLogedIn], editGame)
gameRoutes.delete('/:id', [isLogedIn], deleteGame)

module.exports = gameRoutes
