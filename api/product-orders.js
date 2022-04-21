const express = require("express");
const productOrdersRouter = express.Router();
const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");
const requireUser = require("./utils");
const { product_orders } = require("../db/prisma");

productOrdersRouter.use((req, res, next) => {
    console.log("Request made to /product-orders");
    next();
});

productOrdersRouter.get("/", async (req, res, next) => {
    try {
        const productOrders = await prisma.product_orders.findMany();
        res.send(productOrders);
    } catch (error) {
        next(error);
    }
});

productOrdersRouter.post("/createProductOrder", requireUser, async (req, res, next) => {
    const { orderId, productId, quantity } = req.body;
    try {
        const createProductOrder = await prisma.product_orders.create({
            data: {
                orderId,
                productId,
                quantity
            },
        });
        res.send(createProductOrder);
    } catch (error) {
        next(error);
    }
});

productOrdersRouter.delete(
    "/deleteProductOrder/:productOrderId",
    requireUser,
    async (req, res, next) => {
        try {
            const deleteProductOrder = await prisma.product_orders.delete({
                where: {
                    id: +req.params.productOrderId,
                },
            });
            res.send(deleteProductOrder);
        } catch (error) {
            next(error);
        }
    }
);

productOrdersRouter.patch(
    "/updateProductOrder/:productOrderId",
    requireUser,
    async (req, res, next) => {
        const { quantity } = req.body;
        try {
            const updateProductOrder = await prisma.product_orders.update({
                where: {
                    id: +req.params.productOrderId,
                },

                data: {
                    quantity
                },
            });
            res.send(updateProductOrder);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = productOrdersRouter