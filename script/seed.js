'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

const users = [
  {
    name: 'Jeff Bezos',
    email: 'BigJDawg@ggmail.com',
    password: 'Password123',
    address: '123 Yeehaw Way New York,New York'
  },

  {
    name: "Logan L'Clossier",
    email: 'Xxda14u2NvxX@ggmail.com',
    password: 'Password123',
    address: '390 Party Blvd Berlin,Germany'
  },
  {
    name: 'Don Julio',
    email: 'ILuvYaats@ggmail.com',
    password: 'Password123',
    address: '123 yeehaw way NY,NY'
  },
  {
    name: 'Richard Morgan',
    email: 'LeCaptain@ggmail.com',
    password: 'Password123',
    address: '1 Matey Place, Nassau,Bahamas'
  },
  {
    name: 'Cornelius Blackbeard',
    email: 'NotThatBlackbeard@ggmail.com',
    password: 'Password123',
    address: '421 Lasagna Lane Champagne,France'
  }
]

const seed = async () => {
  await db.sync({force: true})
  await User.bulkCreate(users)
  await Student.bulkCreate(studentsForDb)
  console.log(green('Seeding success!'))
  db.close()
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
