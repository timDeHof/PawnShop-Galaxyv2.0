const prisma = require("./prisma")

async function dropTables() {
  console.log('Dropping All Tables...');
  // drop all tables, in the correct order
  try {
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS product_categories;`
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS product_orders;`
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS orders;`
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS categories;`
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS products;`
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS users;`
    ;
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
}

async function createTables() {
  console.log("Starting to build tables...")
  try {
    await prisma.$executeRaw`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      "shippingAddress" TEXT NOT NULL,
      "billingAddress" TEXT
    );`
    await prisma.$executeRaw`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL, 
      description TEXT,
      condition BOOLEAN NOT NULL,
      "inStock" BOOLEAN NOT NULL,
      "imageURL" VARCHAR(2048)
    );`
    await prisma.$executeRaw`
    CREATE TABLE categories (
      id SERIAL PRIMARY KEY,
      "categoryName" VARCHAR(255)
    );`
    await prisma.$executeRaw`
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "totalAmount" DECIMAL(10,2) NOT NULL,
      "isActive" BOOLEAN NOT NULL
    );`
    await prisma.$executeRaw`
    CREATE TABLE product_orders (
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL
    );`
    await prisma.$executeRaw`
    CREATE TABLE product_categories (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "categoryId" INTEGER REFERENCES categories(id)
    );`
  } catch (error) {
    console.error("Error creating tables!")
  }
}

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      { username: 'albert', password: 'bertie99', name: "albert", shippingAddress: "somewhere" },
      { username: 'sandra', password: 'sandra123', name: "sandra", shippingAddress: "nowhere", billingAddress: "also nowhere" },
      { username: 'glamgal', password: 'glamgal123', name: "gg", shippingAddress: "anywhere" },
    ];
    // const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    // console.log(users);
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  console.log('Starting to create products...');
  try {
    const productsToCreate = [
      { name: "Robot", price: 99999.99, description: "It punches stuff", condition: "true", inStock: "true", image: "https://res.cloudinary.com/fullstack-academy-student/image/upload/v1650389197/81rG1kRmBLL._AC_SL1500__dn6mts.jpg" },
      { name: "PRS Guitar", price: 1600.00, description: "Used paul reed smith", condition: "false", inStock: "true", image: "https://res.cloudinary.com/fullstack-academy-student/image/upload/v1650389255/PRSRedFlame3_k23zac.jpg" },
      { name: "Free Planet", price: 0.00, description: "Getting rid of my old planet", condition: "false", inStock: "true", image: "https://res.cloudinary.com/fullstack-academy-student/image/upload/v1650389363/RS39420302815_Winner_Infrared_20Saturn_20_C2_A9_20La_CC_81szlo_CC_81_20Francsics_rgrjqd.jpg" },
    ];
    // const products = await Promise.all(productsToCreate.map(createUser));

    console.log('products created:');
    // console.log(products);
  } catch (error) {
    console.error('Error creating products!');
    throw error;
  }
}


async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialProducts()
  } catch (error) {
    throw error;
  }
}



rebuildDB()
  // .then(populateInitialData)
  .catch(console.error)
  .finally(() => prisma.$disconnect());



// async function populateInitialData() {
//   try {
//     // create useful starting data by leveraging your
//     // Model.method() adapters to seed your db, for example:
//     // const user1 = await User.createUser({ ...user info goes here... })
//   } catch (error) {
//     throw error;
//   }
// }