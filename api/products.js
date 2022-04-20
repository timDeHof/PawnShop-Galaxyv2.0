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

productsRouter.get("/:category", async (req, res, next) => {
    try {
        const getProductsByCat = await prisma.products.findUnique({
            where: {
                category: req.params.category,
            },
        });
        res.send(getProductsByCat);
    } catch (error) {
        next(error);
    }
});

module.exports = productsRouter