const express = require("express");
const router = express.Router();
const { Shop } = require("../models/shop");
const { Customer } = require("../models/user");
const _ = require("lodash");

router.get("/:id", async (req, res) => {
  try {
    const shops = await Shop.findByShopId(req.params.id);
    res.send(shops);
  } catch (err) {
    console.log("get Shop : ", err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = Shop.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const {
      name,
      iduser
    } = req.body;

    const results = await Shop.addNewShop({
      name,
      iduser
    });
    res.send(results);
  } catch (err) {
    console.log("Error: Shop add new ", err);
  }
});

router.post("/editImage", async (req, res) => {
  try {
    const result = Shop.validateUpdate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const {
      idshop,
      image
    } = req.body;

    await Shop.addShopImage({
      idshop,
      image
    });
    res.status(200).send("Shop image added successfully");
  } catch (err) {
    console.log("Error: Shop add new ", err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const shops = await Shop.findUserShops(req.params.id);
    res.send(shops);
  } catch (err) {
    console.log("get Shop dishes: ", err);
  }
});

router.get("/allshops/:id", async (req, res) => {
  try {
    const shops = await Shop.findHomepageShops(req.params.id);
    res.send(shops);
  } catch (err) {
    console.log("get Shop dishes: ", err);
  }
});

router.get("/check/:shopName", async (req, res) => {
  try {
    const shops = await Shop.findShopNameAvailable(req.params.shopName);
    console.log(shops,shops==[]);
    if(shops.length==0){
      res.send("Available");
    }
    else{
      res.send("Not Available");
    }
  } catch (err) {
    console.log("name permit ", err);
  }
});


router.get("/totalSales/:id", async (req, res) => {
  try {
    const orders = await Shop.findTotalSales(req.params.id);
    res.send(orders);
  } catch (err) {
    console.log("Get user: ", err);
  }
});

module.exports = router;
