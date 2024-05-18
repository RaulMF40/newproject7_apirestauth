const { isLogedIn, isAdmin } = require('../../middlewares/auth')
const {
  register,
  login,
  editUser,
  deleteUser,
  getUsers,
  manageAdmins
} = require('../controllers/users')

const userRoutes = require('express').Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.get('/', getUsers)
userRoutes.put('/admin/:id', [isLogedIn], [isAdmin], manageAdmins)
userRoutes.put('/:id', [isLogedIn], editUser)
userRoutes.delete('/:id', isLogedIn /*[isAdmin]*/, deleteUser)

module.exports = userRoutes
