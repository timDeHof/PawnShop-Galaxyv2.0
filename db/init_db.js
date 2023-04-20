const prisma = require("./prisma");
const {
  users,
  products,
  orders,
  categories,
  productOrders,
  productCategories,
} = require("./seedData");

async function dropTables() {
  console.log("Dropping All Tables...");
  // drop all tables, in the correct order
  try {
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS product_categories;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS product_orders;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS orders;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS categories;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS products;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS users;`;
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  console.log("Starting to build tables...");
  try {
    await prisma.$executeRaw`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      "shippingAddress" TEXT NOT NULL,
      "billingAddress" TEXT,
      "isAdmin" BOOLEAN DEFAULT false
    );`;
    await prisma.$executeRaw`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      description TEXT,
      condition BOOLEAN DEFAULT true,
      "inStock" BOOLEAN DEFAULT true,
      "imageURL" VARCHAR(2048)
    );`;
    await prisma.$executeRaw`
    CREATE TABLE categories (
      id SERIAL PRIMARY KEY,
      "categoryName" VARCHAR(255)
    );`;
    await prisma.$executeRaw`
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "isActive" BOOLEAN DEFAULT true
    );`;
    await prisma.$executeRaw`
    CREATE TABLE product_orders (
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL,
      UNIQUE ("productId", "orderId")

    );`;
    await prisma.$executeRaw`
    CREATE TABLE product_categories (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id) ON DELETE CASCADE,
      "categoryId" INTEGER REFERENCES categories(id)
    );`;
  } catch (error) {
    console.error("Error creating tables!");
  }
}

const seedDb = async () => {
  try {
    console.log("creating users...");
    const userPromises = users.map((user) =>
      prisma.users.create({ data: user })
    );
    const createdUsers = await Promise.all(userPromises);
    console.log(createdUsers);

    console.log("creating products...");
    const productPromises = products.map((product) =>
      prisma.products.create({ data: product })
    );
    const createdProducts = await Promise.all(productPromises);
    console.log(createdProducts);

    console.log("creating orders...");
    const orderPromises = orders.map((order) =>
      prisma.orders.create({ data: order })
    );
    const createdOrders = await Promise.all(orderPromises);
    console.log(createdOrders);

    console.log("creating categories...");
    const categoryPromises = categories.map((category) =>
      prisma.categories.create({ data: category })
    );
    const createdCategories = await Promise.all(categoryPromises);
    console.log(createdCategories);

    console.log("creating productOrders...");
    const productOrderPromises = productOrders.map((productOrder) =>
      prisma.productOrders.create({ data: productOrder })
    );
    const createdProductOrders = await Promise.all(productOrderPromises);
    console.log(createdProductOrders);

    console.log("creating productCategories..");
    const productCategoriesPromises = productCategories.map((productCategory) =>
      prisma.productCategories.create({ data: productCategory })
    );
    const createdProductCategories = await Promise.all(
      productCategoriesPromises
    );
    console.log(createdProductCategories);
  } catch (error) {
    console.error(error);
  }
};
async function rebuildDB() {
  await dropTables();
  await createTables();
  await seedDb();
}

rebuildDB()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
