const express = require("express");

const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const prisma = require("../db/prisma");
const requireUser = require("./utils");

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, name, shippingAddress, billingAddress } =
      req.body;

    const registerUser = await prisma.users.findUnique({
      where: {
        username,
      },
    });
    if (registerUser) {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 8) {
      res.status(401);
      next({ name: "PasswordLengthError", message: "Password Too Short!" });
    } else {
      const user = await prisma.users.create({
        data: {
          username,
          password,
          name,
          shippingAddress,
          billingAddress,
        },
      });

      // create a cart

      await prisma.orders.create({
        data: {
          userId: user.id,
        },
      });

      if (!user) {
        next({
          name: "UserCreationError",
          message: "There was a problem registering you. Please try again.",
        });
      } else {
        // json token
        const token = jwt.sign(
          { id: user.id, username },
          process.env.JWT_SECRET,
          {
            expiresIn: "1w",
          }
        );
        res.send({ user, token, message: "you're logged in!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  // console.log(req, "request");
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    if (user && user.password === password) {
      // create token & return to user
      const token = jwt.sign(
        { id: user.id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({ token, message: "you're logged in!" });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/cart/:userId", async (req, res, next) => {
  try {
    const cart = await prisma.orders.findMany({
      where: {
        userId: +req.params.userId,
        isActive: true,
      },
      include: {
        productOrders: {
          include: {
            products: true,
          },
        },
      },
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:username", async (req, res, next) => {
  // const username = req.params
  try {
    const getUsername = await prisma.users.findUnique({
      where: {
        username: req.params.username,
      },
    });
    res.send(getUsername);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await prisma.users.findMany();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
