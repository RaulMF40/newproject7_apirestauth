const { isLogedIn } = require('../../middlewares/auth')
const {
  addConsole,
  getConsoles,
  editConsole,
  deleteConsole
} = require('../controllers/consoles')

const consoleRoutes = require('express').Router()

consoleRoutes.post('/add', [isLogedIn], addConsole)
consoleRoutes.get('/', getConsoles)
consoleRoutes.put('/:id', [isLogedIn], editConsole)
consoleRoutes.delete('/:id', [isLogedIn], deleteConsole)

module.exports = consoleRoutes
