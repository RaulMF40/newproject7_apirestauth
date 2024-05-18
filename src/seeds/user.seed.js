require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../api/models/users')

const mongoDB =
  'mongodb+srv://gamesproject7:bK4S9CsE9VRyKDda31@cluster0.wubp1ik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const users = [
  {
    email: 'juan@gameproject7.com',
    username: 'Juan',
    password: 'juan123',
    birthYear: 1995,
    role: 'admin',
    profileImage:
      'https://www.shutterstock.com/image-vector/vector-man-head-virtual-reality-260nw-1928602400.jpg',
    platform: []
  },
  {
    email: 'david@gameproject7.com',
    username: 'David',
    password: 'david123',
    birthYear: 1988,
    role: 'user',
    profileImage:
      'https://cdn.dribbble.com/users/6048699/screenshots/14208992/samx_avatar_4x.png',
    platform: []
  },
  {
    email: 'alicia@gameproject7.com',
    username: 'Alicia',
    password: 'alicia123',
    birthYear: 2000,
    role: 'guest',
    profileImage:
      'https://www.shutterstock.com/image-vector/gamer-girl-playing-portabe-console-260nw-1844659003.jpg',
    platform: []
  },
  {
    email: 'santiago@gameproject7.com',
    username: 'Santiago',
    password: 'santiago123',
    birthYear: 1982,
    role: 'admin',
    profileImage:
      'https://img.freepik.com/premium-vector/gamer-streamer-mascot-logo-vector-illustration_382438-609.jpg',
    platform: []
  },
  {
    email: 'raul@gameproject7.com',
    username: 'Raúl',
    password: 'raul123',
    birthYear: 1980,
    role: 'admin',
    profileImage:
      'https://i.pinimg.com/736x/66/06/19/660619ef6dba6870686cc76d0256afe1.jpg',
    platform: []
  },
  {
    email: 'roberto@gameproject7.com',
    username: 'Roberto',
    password: 'roberto123',
    birthYear: 1991,
    role: 'user',
    profileImage:
      'https://www.shutterstock.com/shutterstock/photos/1713348724/display_1500/stock-vector-gas-mask-gamer-mascot-logo-for-gaming-stream-channel-or-community-1713348724.jpg',
    platform: []
  },
  {
    email: 'natalia@gameproject7.com',
    username: 'Natalia',
    password: 'natalia123',
    birthYear: 1989,
    role: 'user',
    profileImage:
      'https://www.shutterstock.com/image-vector/gamer-girl-mascot-gaming-esport-600w-1545699083.jpg',
    platform: []
  },
  {
    email: 'fran@gameproject7.com',
    username: 'Fran',
    password: 'fran123',
    birthYear: 1984,
    role: 'admin',
    profileImage:
      'https://img.freepik.com/vektoren-premium/gamer-maskottchen-logo-design-vektor-fuer-sportmannschaften_527675-17.jpg',
    platform: []
  }
]

const userDocuments = users.map((user) => {
  const newUser = new User(user)
  newUser.password = bcrypt.hashSync(newUser.password, 10)
  return newUser
})

console.log(mongoDB)

mongoose
  .connect(mongoDB)
  .then(async () => {
    const allUsers = await User.find()

    if (allUsers.length) {
      await User.collection.drop()
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await User.insertMany(userDocuments)
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect())
