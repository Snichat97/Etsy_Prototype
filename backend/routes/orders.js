const express = require("express");
const router = express.Router();
const { Orders } = require("../models/orders");
const { OrderItems } = require("../models/orderItems");
const {Product}  = require("../models/product");
const _ = require("lodash");

router.post("/", async (req, res) => {
  try {
    const  content  = req.body;

    console.log(content);
    const data = await Orders.addNewOrder(content.userId);
    console.log(content);

    await Promise.all(
      content.item.map(async (item) => {
        await OrderItems.addNewOrderItem({ ...item, idorder: data.insertId });
        const product = await Product.findById(item.idproduct);
        Orders.alterAllProducts(product,item)
      })
    );

    res.send("Succesfully added orders");
  } catch (err) {
    console.log("Orders post err: ", err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const orders = await Orders.getUserOrders(req.params.id);
    res.send(orders);
  } catch (err) {
    console.log("Get user: ", err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const orders = await Orders.alterAllProducts(req.params.id);
    res.send(orders);
  } catch (err) {
    console.log("Get user: ", err);
  }
});

module.exports = router;
