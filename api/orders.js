const express = require("express");
const ordersRouter = express.Router();
const prisma = require("../db/prisma");
const requireUser = require("./utils");

ordersRouter.use((req, res, next) => {
    console.log("Request made to /orders");
    next();
});

ordersRouter.get("/", async (req, res, next) => {
    try {
        const orders = await prisma.orders.findMany();
        res.send(orders);
    } catch (error) {
        next(error);
    }
});

ordersRouter.get("/:userId", requireUser, async (req, res, next) => {
    try {
        const orders = await prisma.orders.findMany({
            where: {
                userId: +req.params.userId,
              },
        });
        res.send(orders);
    } catch (error) {
        next(error);
    }
});

module.exports = ordersRouter