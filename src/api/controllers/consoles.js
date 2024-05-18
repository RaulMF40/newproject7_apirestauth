const Console = require('../models/consoles')

const addConsole = async (req, res, next) => {
  try {
    const newConsole = new Console(req.body)
    const existingConsole = await Console.findOne({ name: req.body.name })
    if (existingConsole) {
      return res
        .status(400)
        .json(`Esa consola ya está registrada con el id: ${existingConsole.id}`)
    }
    const savedConsole = await newConsole.save()
    return res.status(201).json(savedConsole)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const editConsole = async (req, res, next) => {
  try {
    const { id } = req.params
    const newConsole = new Console(req.body)
    newConsole._id = id
    const updatedConsole = await Console.findByIdAndUpdate(id, newConsole, {
      new: true
    })
    return res.status(200).json({
      message: 'Consola actualizada correctamente',
      consola: updatedConsole
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteConsole = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedConsole = await Console.findByIdAndDelete(id)
    if (deletedConsole) {
      return res
        .status(200)
        .json({ mensaje: 'Consola eliminada', juego: deletedConsole })
    } else {
      return res.status(404).json('Consola no encontrada')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getConsoles = async (req, res, next) => {
  try {
    const allConsoles = await Console.find()
    if (allConsoles.length === 0) {
      return res
        .status(204)
        .json('Todavía no hay consolas cargadas en la base de datos')
    }
    return res.status(200).json(allConsoles)
  } catch (error) {
    return next(error)
  }
}

module.exports = { addConsole, editConsole, deleteConsole, getConsoles }
