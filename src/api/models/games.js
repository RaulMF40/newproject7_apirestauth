const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, unique: true },
    releaseYear: { type: Number, trim: true },
    img: { type: String, trim: true, required: true },
    platform: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Console'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'games'
  }
)

const Game = mongoose.model('game', gameSchema, 'games')

module.exports = Game
