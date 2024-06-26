const { generateSign } = require('../../utils/jwt')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body)
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
      return res.status(400).json('Ese nombre de usuario ya existe')
    }
    newUser.role = 'user'
    /* existingUser.role = 'user'*/
    const savedUser = await newUser.save()
    return res.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }) //validar user
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //validar password
        const token = generateSign(user._id)
        return res.status(200).json({ user, token })
      } else {
        return res.status(400).json('Usuario o contraseña incorrectos')
      }
    } else {
      return res.status(400).json('Usuario o contraseña incorrectos')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const editUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (req.user.id === id || req.user.role === 'admin') {
      //Quiero que solo el mismo usuario o un administrador puedan editar los datos del usuario
      const newUser = new User(req.body)
      newUser._id = id
      newUser.role = req.user.role //hago que con esta función no se pueda cambiar el rol
      const updatedUser = await User.findByIdAndUpdate(id, newUser, {
        new: true
      })
      return res.status(200).json({
        message: 'Usuario actualizado correctamente',
        usuario: updatedUser
      })
    } else {
      return res
        .status(400)
        .json('No estás autorizado para realizar esta acción')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { user } = req

    const userToDelete = await User.findById(id)

    if (!userToDelete) {
      return res.status(404).json('Usuario no encontrado')
    }

    // Verificar si el usuario autenticado es un administrador o si está eliminando su propia cuenta
    // Y también verificar que un usuario no administrador no está intentando eliminar a un administrador
    if (
      (user.role === 'admin' || user._id.toString() === id) &&
      !(user.role !== 'admin' && userToDelete.role === 'admin')
    ) {
      const deletedUser = await User.findByIdAndDelete(id)

      if (deletedUser) {
        return res
          .status(200)
          .json({ mensaje: 'Usuario eliminado', usuario: deletedUser })
      } else {
        return res.status(404).json('Usuario no encontrado')
      }
    } else {
      return res
        .status(403)
        .json('No estás autorizado para realizar esta acción')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate('platform')
    return res.status(200).json(allUsers)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const manageAdmins = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        role: req.body.role
      },
      { new: true }
    )
    return res.status(200).json({
      message: 'Usuario actualizado correctamente',
      usuario: updatedUser
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  register,
  login,
  editUser,
  deleteUser,
  getUsers,
  manageAdmins
}
