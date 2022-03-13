const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
                                                                                                               
router.get("/productshop/:id", async (req, res) => {
  try {
    const results = await Product.findByShopId(req.params.id);
    res.send(results);
  } catch (err) {
    console.log("get products");
  }
});
router.get("/", async (req, res) => {
  try {
    const results = await Product.getAll(req.params.id);
    res.send(results);
  } catch (err) {
    console.log("get products");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [id] = await Product.findById(req.params.id);
    res.send(id);
  } catch (err) {
    console.log("get products");
  }
});

router.post("/", async (req, res) => {
  try {
    const result = Product.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const data = req.body;
    await Product.addNewProduct(data);
    res.send("Successfully added the dish data");
  } catch (err) {
    console.log("Added dish: ", err);
  }
});

router.post("/update", async (req, res) => {
  try {
    const result = Product.validateUpdate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const data = req.body;
    await Product.updateProductDetails(data);
    res.send("Successfully updated the product data");
  } catch (err) {
    console.log("Update product: ", err);
  }
});

module.exports = router;
