'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

const users = [
  {
    firstName: 'Jeff',
    lastName: 'Bezos',
    email: 'BigJDawg@ggmail.com',
    password: 'Password123',
    address: '123 Yeehaw Way New York,New York'
  },

  {
    firstName: 'Logan',
    lastName: 'LClossier',
    email: 'Xxda14u2NvxX@ggmail.com',
    password: 'Password123',
    address: '390 Party Blvd Berlin,Germany'
  },
  {
    firstName: 'Don',
    lastName: 'Julio',
    email: 'ILuvYaats@ggmail.com',
    password: 'Password123',
    address: '123 yeehaw way NY,NY'
  },
  {
    firstName: 'Richard',
    lastName: 'Long',
    email: 'CPT-R_LONG@ggmail.com',
    password: 'Password123',
    address: '1 Matey Place, Nassau,Bahamas'
  },
  {
    firstName: 'Cornelius',
    lastName: 'Blackbeard',
    email: 'NotThatBlackbeard@ggmail.com',
    password: 'Password123',
    address: '421 Lasagna Lane Champagne,France'
  }
]

const seed = async () => {
  await db.sync({force: true})
  await User.bulkCreate(users)
  // await Product.bulkCreate(products)
  console.log('Seeding success!')
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
