const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function createTables () {
  try {
    await client.query(`
    CREATE TABLE user (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    `)
  } catch (error) {
    console.error("Error creating tables!")
  }
}

async function rebuildDB() {
  try {
    client.connect();

    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

rebuildDB()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
