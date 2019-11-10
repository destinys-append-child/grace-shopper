'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderProduct} = require('../server/db/models')

const users = [
  {
    firstName: 'Jeff',
    lastName: 'Bezos',
    email: 'BigJDawg@ggmail.com',
    password: 'Password123'
  },

  {
    firstName: 'Logan',
    lastName: 'LClossier',
    email: 'Xxda14u2NvxX@ggmail.com',
    password: 'Password123'
  },
  {
    firstName: 'Don',
    lastName: 'Julio',
    email: 'ILuvYaats@ggmail.com',
    password: 'Password123'
  },
  {
    firstName: 'Richard',
    lastName: 'Long',
    email: 'CPT-R_LONG@ggmail.com',
    password: 'Password123'
  },
  {
    firstName: 'Cornelius',
    lastName: 'Blackbeard',
    email: 'NotThatBlackbeard@ggmail.com',
    password: 'Password123'
  },
  {
    firstName: 'Megan',
    lastName: 'Donnelly',
    email: 'megan@gmail.com',
    password: 'test1234'
  }
]

const boats = [
  {
    name: 'AMELS 242',
    imageUrl:
      'https://s3.amazonaws.com/boss.yatco.com/ForSale/Vessel/Photo/250672/medium_2591789.jpg',
    imageUrlAltView:
      'https://www.charterworld.com/images/headers-6/perfection-01_01.jpg',
    description:
      'This AMELS 242 new construction project features an expansive 2,580 sq ft. dedicated Owner’s Deck with a spectacular forward-facing stateroom and spacious & light his-and-hers bathrooms. This deck also includes a refined Owner’s Office with separate entry, a French balcony, and a large aft lounge with shaded outdoor dining and a bar.The AMELS 242 also features an award-winning Beach Club and folding beach platform starboard. This is an amazing place to relax, enjoy a sauna, hammam, Jacuzzi, hair and nail salon or massage.',
    price: '110419594',
    avgRating: '4',
    quantity: '35',
    category: 'Super Yacht'
  },
  {
    name: 'AQUARIUS',
    imageUrl:
      'https://www.superyachttimes.com/uploads/store/photo/96167/image/large-11ee25fdc030825b2d46c371eca7348e.jpg',
    imageUrlAltView:
      'https://dbj7896sklvdk.cloudfront.net/fleetimages/5544/md_main_lounge__1920.jpg',
    description:
      'AQUARIUS begs you to explore the world and with her generous use of floor-to-ceiling windows, there is nothing you won’t miss. She offers an array of remarkable features, including a bar situated at water level under her glass-bottom pool. When the party starts, the large pool can be transformed into a dancefloor. AQUARIUS has a helipad and a toy garage. Her spacious swim platform offers direct access to the guest gym with fold-down terrace and a beach club adjacent to a massage and beauty salon. Her sundeck offers on deck dining and a sumptuous jacuzzi.',
    price: '500242142',
    avgRating: '5',
    quantity: '60',
    category: 'Super Yacht'
  },
  {
    name: 'ALEGRIA 67',
    imageUrl:
      'https://www.catamarans-fountaine-pajot.com/wp-content/uploads/2019/02/alegria-67-fountaine-pajot-sailing-catamarans-img.jpg',
    imageUrlAltView:
      'https://mk0dreamyachtsahj1u8.kinstacdn.com/app/uploads/2019/01/fountaine-pajot-alegria-67_catamaran_interior_1-1920x1280.jpg',
    description:
      'The Alegria 67, a trully catamaran yacht, evokes your finest senses. The Alegria 67 is true to her name – the Portugese word for ‘joy’ – offering sublime relaxation spaces including an expansive flybridge, private lounges, foredeck Jacuzzi, a cockpit seamlessly integrated with a saloon featuring panoramic sea views, her Beach Club embedded gangway, and much more. The stunning interior is boldly modern and incredibly spacious to deliver the ultimate in comfort and luxury',
    price: '2491200',
    avgRating: '4',
    quantity: '20',
    category: 'Catamaran'
  },
  {
    name: "85' LAZZARA",
    imageUrl:
      'https://imt.boatwizard.com/images/1/83/35/6948335_20190104114204009_1_XLARGE.jpg',
    imageUrlAltView:
      'http://t.wallpaperweb.org/wallpaper/boats/1600x1200/lazzara_lsx92_salonaft.jpg',
    description:
      "At 180 Gross tons the 85’ demonstrates exceptional value and innovative design. Per square foot it is less to own, less to operate and more to experience than any yacht before. It features an innovative lower deckwith a full beam accommodation area.  Full customization of the interior, offering 4 large VIPS and a full beam master with two private balcony's.",
    price: '8500000',
    avgRating: '5',
    quantity: '25',
    category: 'Catamaran'
  },
  {
    name: 'JESSY 1',
    imageUrl:
      'https://cdn.yatco.com/images/vessels2/239/239950/large_1817082.jpg?rev=1',
    description:
      "This luxury vessel's sophisticated exterior design and engineering are the work of Hershine. Her exterior is styled by the Hershine team who are also responsible for the entire engineering package. Powered by 2 MTU diesel engines Motor yacht Jesse is capable of a top speed of 31 knots, and comfortably cruises at 25 knots. With her 9,900 fuel tanks she has a maximum range of 1,000 nautical miles at 10 knots. Her water tanks store around 1,800 of fresh water.",
    price: '541396',
    avgRating: '4',
    quantity: '30',
    category: 'Motoryacht'
  },
  {
    name: 'Q95',
    imageUrl:
      'https://cdn.boatinternational.com/images/20181105/1-195451l-960x540.jpg',
    imageUrlAltView:
      'https://www.yacht-zoo.com/wp-content/uploads/2018/11/18.jpg',
    description:
      'Q 95 is a 45.5m luxury yacht, built by Overmarine and delivered in 2018. Her top speed is 16.5kn and she boasts a maximum cruising range of 5500.0nm at 10.0kn with power coming from two 1528.0hp MTU 12V4000M53R diesel engines. She can accommodate up to 12 people with 9 crew members waiting on their every need.',
    price: '25463024',
    avgRating: '4',
    quantity: '10',
    category: 'Motoryacht'
  },
  {
    name: 'DANNESKJOLD',
    imageUrl:
      'https://cdn.boatinternational.com/images/20190624/1-221477l-960x540.jpg',
    imageUrlAltView:
      'https://image.yachtcharterfleet.com/charter-DANNESKJOLD/DANNESKJOLD-eis-pre-refit-5.jpg?image_id=35426&k=9810&w=800&h=532&q=75',
    description:
      'DANNESKJOLD is designed with owner/guest accommodations forward and crew cabins aft. There is a central corridor leading forward to the Master cabin and 2 Guest cabins either side. The Master stateroom head compartment has been completely rebuilt in 2018 with dual sinks, a full standup shower compartment plus a full height closet. There are 2 berths in the Master with a queen and an oversized single berth. A custom bureau with espresso machine and private beverage fridge has been fitted.',
    price: '5550000',
    avgRating: '3',
    quantity: '25',
    category: 'Sailing Yacht'
  },
  {
    name: 'ALL ABOUT U2',
    imageUrl:
      'https://cdn.boatinternational.com/images/20190128/1-202829l-960x540.jpg',
    imageUrlAltView:
      'https://newimages.yachtworld.com/resize/1/31/20/6963120_20190809081254899_1_XLARGE.jpg?f=/1/31/20/6963120_20190809081254899_1_XLARGE.jpg&w=924&h=693&t=1566931999000',
    description:
      'ALL ABOUT U2 is a 49.99m luxury yacht, built by Ada Yacht Works and delivered in 2019. Her top speed is 16.0kn and she boasts a maximum cruising range of 3000.0nm at 10.0kn with power coming from two 800.0hp Caterpillar C-18-ACERT diesel engines. She can accommodate up to 14 people with 11 crew members. She was designed by Ginton Naval Architects, and the interior design was created by Dekki Design.  custom bureau with espresso machine and private beverage fridge has been fitted.',
    price: '17900000',
    avgRating: '5',
    quantity: '25',
    category: 'Sailing Yacht'
  }
]

//orderId(PK), userId, 2 addresses, orderCost
//payment info?
const orders = [
  {
    userId: 1,
    orderCost: 2491200,
    shipping: '5 Hanover Street, New York City, NY, 09385',
    billing: '5 Hanover Street, New York City, NY, 09385',
    isPurchased: true
  },
  {
    userId: 2,
    orderCost: 5550000
  },
  {
    userId: 6,
    orderCost: 610661736
  },
  {
    userId: 6,
    orderCost: 25463024,
    shipping: '15 Test Street, New York City, NY, 09385',
    billing: '222 Fork Street, New York City, NY, 09385',
    isPurchased: true
  }
]

const orderProducts = [
  {
    orderId: 1,
    productId: 3,
    itemQty: 1,
    itemPrice: 2491200
  },
  {
    orderId: 2,
    productId: 7,
    itemQty: 2,
    itemPrice: 5550000
  },
  {
    orderId: 3,
    productId: 1,
    itemQty: 1,
    itemPrice: 110419594
  },
  {
    orderId: 3,
    productId: 2,
    itemQty: 4,
    itemPrice: 500242142
  },
  {
    orderId: 4,
    productId: 6,
    itemQty: 1,
    itemPrice: 25463024
  }
]

const seed = async () => {
  await db.sync({force: true})
  await User.bulkCreate(users)
  await Product.bulkCreate(boats)
  await Order.bulkCreate(orders)
  await OrderProduct.bulkCreate(orderProducts)
  await console.log('Seeding success!')
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
