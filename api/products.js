const express = require("express");
const productsRouter = express.Router();
const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");
const requireUser = require("./utils");
const { product_orders } = require("../db/prisma");

productsRouter.use((req, res, next) => {
  console.log("Request made to /products");
  next();
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await prisma.products.findMany();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const getProductsById = await prisma.products.findMany({
      where: {
        id: +req.params.id,
      },
    });
    res.send(getProductsById);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/createProduct", requireUser, async (req, res, next) => {
  const { name, price, description, condition, inStock, imageURL } = req.body;
  try {
    const createProduct = await prisma.products.create({
      data: {
        name,
        price,
        description,
        condition,
        inStock,
        imageURL,
      },
    });
    res.send(createProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/category/:categoryId", async (req, res, next) => {
  try {
    const getProductsByCat = await prisma.product_categories.findMany({
      where: {
        categoryId: +req.params.categoryId,
      },
    });
    res.send(getProductsByCat);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch(
  "/updateProduct/:productsid",
  requireUser,
  async (req, res, next) => {
    const { name, price, description, condition, inStock, imageURL } = req.body;
    try {
      const updateProduct = await prisma.products.updateMany({
        where: {
          id: +req.params.productsid,
        },

        data: {
          name,
          price,
          description,
          condition,
          inStock,
          imageURL,
        },
      });
      res.send(updateProduct);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.delete(
  "/deleteProduct/:productsid",
  requireUser,
  async (req, res, next) => {
    try {
      const deleteProduct = await prisma.products.delete({
        where: {
          id: +req.params.productsid,
        },

        include: {
          product_orders: {
          productsid: product_orders.productid
          },
        },
      });
      res.send(deleteProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productsRouter;
