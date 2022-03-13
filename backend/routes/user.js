const express = require("express");
const router = express.Router();
const { Customer } = require("../models/user");
const { DeliveryAddresses } = require("../models/deliveryAddress");

router.post("/", async (req, res) => {
  try {
    const result = Customer.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const { name,email,password} = req.body;

    // if (user) return res.status(400).send("Username already exists");

    const cust = await Customer.addNewCustomer({
      name,
      email,
      password
    });

    const response ={
      message:"Account created successfully",
      userId:cust.insertId
    }

    res.status(200).send(response);
  } catch (err) {
    console.log("Error: user add new ", err);
  }
});

router.get("/", async (req, res) => {
  try {
    // const result = Customer.validate(req.body);
    // if (result.error) {
    //   return res.status(400).send(result.error.details[0].message);
    // }

    // const { name,email,password} = req.body;

    // if (user) return res.status(400).send("Username already exists");

    const cust = await Customer.addNewCustomer();
    res.status(200).send("Account created successfully");
  } catch (err) {
    console.log("Error: user add new ", err);
  }
});

router.get("/:id", async (req, res) => {
  const [customer] = await Customer.findById(req.params.id);
  if (!customer) {
    return res
      .status(404)
      .send("Customer data with auth credentials was not found");
  }

  res.send(customer);
});

router.post("/update/:id", async (req, res) => {
  try {
    const result = Customer.validateProfileUpdate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const data = req.body;

    await Customer.updateCustomerDetails(data);
    res.send("Successfully updated customer data");
  } catch (err) {
    console.log("Error: Customer Update: ", err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = Customer.validateLogin(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const data = req.body;
    const results=await Customer.findByEmail(data);
    if(results!=false){
      res.send(results);
    }
    res.send(false);
  }
  catch (err) {
    console.log("Error: Customer Update: ", err);
  }})
module.exports = router;
