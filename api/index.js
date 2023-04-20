const express = require("express");

const apiRouter = express.Router();

const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const prisma = require("../db/prisma");

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
  next();
});

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await prisma.users.findUnique({
          where: {
            id,
          },
        });
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

const usersRouter = require("./users");

apiRouter.use("/users", usersRouter);

const productsRouter = require("./products");

apiRouter.use("/products", productsRouter);

const productOrdersRouter = require("./product-orders");

apiRouter.use("/product-orders", productOrdersRouter);

const ordersRouter = require("./orders");

apiRouter.use("/orders", ordersRouter);

// place your routers here
apiRouter.get("/", (req, res) => {
  res.send({
    message: "API is under construction!!!",
  });
});
// apiRouter.use((error, req, res, next) => {
//   res.send({
//     name: error.name,
//     message: error.message,
//   });
// });

module.exports = apiRouter;
