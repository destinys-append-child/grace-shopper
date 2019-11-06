'use strict'

const db = require('../server/db')
const {User, Product, Cart, Order, OrderDetail} = require('../server/db/models')

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
  },
  {
    firstName: 'Megan',
    lastName: 'Donnelly',
    email: 'megan@gmail.com',
    password: 'test1234',
    address: '123 Main Rd., New York, NY'
  }
]

const boats = [
  {
    name: 'AMELS 242',
    imageUrl:
      'https://www.moranyachts.com/wp-content/uploads/amels-242-for-sale-profile-moran-yachts.jpg',
    description:
      'The AMELS 242 yacht was designed by Tim Heywood and has quickly become one of the most recognizable designs afloat. Due to the AMELS Limited Edition approach, the owner can select their own Interior Designer for completely custom interiors. This AMELS 242 new construction project features an expansive 2,580 sq ft. dedicated Owner’s Deck with a spectacular forward-facing stateroom and spacious & light his-and-hers bathrooms. This deck also includes a refined Owner’s Office with separate entry, a French balcony, and a large aft lounge with shaded outdoor dining and a bar.The AMELS 242 also features an award-winning Beach Club and folding beach platform starboard. This is an amazing place to relax, enjoy a sauna, hammam, Jacuzzi, hair and nail salon or massage.',
    price: '110419594',
    avgRating: '4',
    inventory: '35',
    category: 'Super Yacht'
  },
  {
    name: 'AQUARIUS',
    imageUrl:
      'https://www.moranyachts.com/wp-content/uploads/feadship-aquarius-92m-for-sale-profile.jpg',
    description:
      'AQUARIUS is among the latest of incredible Feadship superyachts to benefit from this extraordinary heritage. The moment you see her, you know she is something very special. AQUARIUS begs you to explore the world and with her generous use of floor-to-ceiling windows, there is nothing you won’t miss. She has very clean lines inside and out, giving you the peace-of-mind her appearance will remain elegant and timeless well into the future. Through clever engineering, the interior spaces are voluminous and unobstructed, giving your family and friends more than enough space for fun and entertainment. While she offers an array of remarkable features, perhaps the most exceptional would be the bar situated at water level under her glass-bottom pool. When the party starts, the large pool can be transformed into a dancefloor. AQUARIUS has a helipad and a 32’ (10m) tender that is stored in a tender and toy garage. Her spacious swim platform offers direct access to the guest gym with fold-down terrace and a beach club adjacent to a massage and beauty salon. Her sundeck offers on deck dining and features a sumptuous jacuzzi.',
    price: '500242142',
    avgRating: '5',
    inventory: '60',
    category: 'Super Yacht'
  },
  {
    name: 'Alegria 67',
    imageUrl:
      'https://www.catamarans-fountaine-pajot.com/wp-content/uploads/2019/02/alegria-67-fountaine-pajot-sailing-catamarans-img.jpg',
    description:
      'Presenting a Flagship to deliver breathtaking bluewater holiday experiences for everyone to share…An expansive flybridge with an authentic ocean terrace and a forward cockpit that can accommodate a jacuzzi; just some of the hallmarks of a lifestyle worthy of the finest homes and affording the incomparable pleasure of owning a Flagship. The Alegria 67, a trully catamaran yacht, evokes your finest senses, whether you are on the Flybridge experiencing the exhilaration of sailing or simply relaxing on the decadent lounges or sunbathing beds. Sheer Style…The Alegria 67 is true to her name – the Portugese word for ‘joy’ – offering sublime relaxation spaces including an expansive flybridge, private lounges, foredeck Jacuzzi, a cockpit seamlessly integrated with a saloon featuring panoramic sea views, her Beach Club embedded gangway, and much more. The stunning interior is boldly modern and incredibly spacious to deliver the ultimate in comfort and luxury',
    price: '2491200',
    avgRating: '4',
    inventory: '20',
    category: 'Catamaran'
  },
  {
    name: "85' Lazzara",
    imageUrl:
      'https://imt.boatwizard.com/images/1/83/35/6948335_20190104114204009_1_XLARGE.jpg',
    description:
      "The new  85’ is part of a semi-custom line of power catamarans utilizing a semi planning hull form.  At 180 Gross tons the Corona 85’ demonstrates exceptional value and innovative design. Per square foot it is less to own, less to operate and more to  experience than any yacht before.  The unique patent pending design affords an owner the same square footage of a 130’ yacht that is only 85’ in length.  It features an innovative lower deck, in which unlike traditional catamarans where only the outboard hulls are utilized for accommodations, the Corona lower deck features a full beam lower deck accommodation area.  Full customization of the interior, offering 4 large VIPS and a full beam master with two private balcony's.",
    price: '8500000',
    avgRating: '5',
    inventory: '25',
    category: 'Catamaran'
  },
  {
    name: 'Jessy 1',
    imageUrl:
      'https://cdn.yatco.com/images/vessels2/239/239950/large_1817082.jpg?rev=1',
    description:
      'The 87.99ft custom Motor yacht "Jesse" was built by Hershine. This luxury vessel\'s sophisticated exterior design and engineering are the work of Hershine. Her exterior is styled by the Hershine team who are also responsible for the entire engineering package. Her exterior is styled by the Hershine team who are also responsible for the entire engineering package. Powered by 2 MTU (12V2000M91) diesel engines Motor yacht Jesse is capable of a top speed of 31 knots, and comfortably cruises at 25 knots. With her 9,900 fuel tanks she has a maximum range of 1,000 nautical miles at 10 knots. Her water tanks store around 1,800 of fresh water.',
    price: '541396',
    avgRating: '4',
    inventory: '30',
    category: 'Motoryacht'
  },
  {
    name: 'Q 95',
    imageUrl:
      'https://cdn.boatinternational.com/images/20181105/1-195451l-960x540.jpg',
    description:
      'Q 95 is a 45.5m luxury yacht, built by Overmarine and delivered in 2018. Her top speed is 16.5kn and she boasts a maximum cruising range of 5500.0nm at 10.0kn with power coming from two 1528.0hp MTU 12V4000M53R diesel engines. She can accommodate up to 12 people with 9 crew members waiting on their every need.',
    price: '25463024',
    avgRating: '4',
    inventory: '10',
    category: 'Motoryacht'
  },
  {
    name: 'DANNESKJOLD',
    imageUrl:
      'https://cdn.boatinternational.com/images/20190624/1-221477l-960x540.jpg',
    description:
      'DANNESKJOLD is designed with owner/ guest accommodations forward and crew cabins aft. In 2017 and 2018, the entire yacht was completely refitted and the interior décor redesigned as well as owner’s cabin rebuilt. DANNESKJOLD is virtually a new yacht at this time. The Owner/guest accommodations are forward in 3 double staterooms with ensuite head compartments. There is a central corridor leading forward to the Master cabin and 2 Guest cabins either side. The Master stateroom head compartment has been completely rebuilt in 2018 with dual sinks, a full standup shower compartment plus a full height closet. There are 2 berths in the Master with a queen and an oversized single berth. A custom bureau with espresso machine and private beverage fridge has been fitted.',
    price: '5550000',
    avgRating: '3',
    inventory: '25',
    category: 'Sailing Yacht'
  },
  {
    name: 'ALL ABOUT U2		',
    imageUrl:
      'https://cdn.boatinternational.com/images/20190128/1-202829l-960x540.jpg',
    description:
      'ALL ABOUT U2 is a 49.99m luxury yacht, built by Ada Yacht Works and delivered in 2019. Her top speed is 16.0kn and she boasts a maximum cruising range of 3000.0nm at 10.0kn with power coming from two 800.0hp Caterpillar C-18-ACERT diesel engines. She can accommodate up to 14 people with 11 crew members. She was designed by Ginton Naval Architects, and the interior design was created by Dekki Design.  custom bureau with espresso machine and private beverage fridge has been fitted.',
    price: '17900000',
    avgRating: '5',
    inventory: '25',
    category: 'Sailing Yacht'
  }
]

const carts = [
  {
    userId: 1,
    cart_qty: 1,
    quantity: 1
  },
  {
    userId: 2,
    productId: 2,
    cart_qty: 2
  },
  {
    userId: 3,
    productId: 3,
    cart_qty: 3
  },
  {
    userId: 1,
    productId: 3,
    cart_qty: 2
  },
  {
    userId: 6,
    productId: 1,
    cart_qty: 5
  },
  {
    userId: 6,
    productId: 3,
    cart_qty: 1
  }
]
//orderId(PK), userId, 2 addresses, totalCost
//payment info?
const orders = [
  {
    userId: 1,
    shipping: '5 Hanover Street, New York City, NY, 09385',
    billing: '5 Hanover Street, New York City, NY, 09385',
    totalCost: 7000
  },
  {
    userId: 2,
    shipping: '6 Main Street, New York City, NY, 09385',
    billing: '7 Hanover Street, New York City, NY, 09385',
    totalCost: 20000
  },
  {
    userId: 3,
    shipping: '6 Broad Street, New York City, NY, 09385',
    billing: '7 Hanover Street, New York City, NY, 09385',
    totalCost: 14000
  }
]

const orderDetail = [
  //USERID: 1
  {
    detailQuantity: 1,
    detailPrice: 3000,
    productId: 1,
    orderId: 1
  },
  {
    detailQuanitity: 1,
    detailPrice: 4000,
    productId: 3,
    orderId: 1
  },
  //USERID: 2
  {
    detailQuanitity: 2,
    detailPrice: 10000,
    productId: 2,
    orderId: 2
  },
  {
    detailQuanitity: 5,
    detailPrice: 15000,
    productId: 1,
    orderId: 2
  },
  {
    detailQuanitity: 1,
    detailPrice: 4000,
    productId: 3,
    orderId: 2
  },
  //USERID: 3
  {
    detailQuanitity: 3,
    detailPrice: 12000,
    productId: 3,
    orderId: 3
  }
]

const seed = async () => {
  await db.sync({force: true})
  await User.bulkCreate(users)
  await Product.bulkCreate(boats)
  await Cart.bulkCreate(carts)
  await Order.bulkCreate(orders)
  await OrderDetail.bulkCreate(orderDetail)
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
