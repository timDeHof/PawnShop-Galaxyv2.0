const users = [
  { username: 'albert', password: 'bertie99', name: "albert", shippingAddress: "somewhere" },
  { username: 'sandra', password: 'sandra123', name: "sandra", shippingAddress: "nowhere", billingAddress: "also nowhere" },
  { username: 'glamgal', password: 'glamgal123', name: "gg", shippingAddress: "anywhere" },
  { username: 'adminACC', password: 'badpassword', name: "Admin1", shippingAddress: "anywhere", isAdmin: true },
];

const products = [
  { name: "Robot", price: 99999.99, description: "It punches stuff", condition: true, inStock: true, imageURL: "https://res.cloudinary.com/fullstack-academy-student/image/upload/v1650389197/81rG1kRmBLL._AC_SL1500__dn6mts.jpg" },
  { name: "PRS Guitar", price: 1600.00, description: "Used paul reed smith", condition: false, inStock: true, imageURL: "https://res.cloudinary.com/fullstack-academy-student/image/upload/v1650389255/PRSRedFlame3_k23zac.jpg" },
  { name: "Free Planet", price: 0.00, description: "Getting rid of my old planet", condition: false, inStock: true, imageURL: "https://res.cloudinary.com/fullstack-academy-student/image/upload/v1650389363/RS39420302815_Winner_Infrared_20Saturn_20_C2_A9_20La_CC_81szlo_CC_81_20Francsics_rgrjqd.jpg" },
];

const orders = [
  { userId: 1, isActive: true },
  { userId: 2, isActive: true },
  { userId: 1, isActive: false }
]

const categories = [
  { categoryName: "musicEquipment" },
  { categoryName: "spaceStuff" }
]

const product_orders = [
  { orderId: 1, productId: 2, quantity: 5 },
  { orderId: 1, productId: 1, quantity: 5 }
]

const productCategories = [
  { productId: 2, categoryId: 2 },
  { productId: 1, categoryId: 1 },
  { productId: 3, categoryId: 2 }
]
module.exports = { users, products, orders, categories, product_orders, productCategories }