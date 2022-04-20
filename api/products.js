const express = require("express");
const productsRouter = express.Router();
const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");
const requireUser = require("./utils");

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
})

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



module.exports = productsRouter