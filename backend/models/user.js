const Joi = require("joi");
const con = require("../db");

const tableName = "user";

class Customer {
  static addNewCustomer = async ({
    name,
    email,
    password,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (name,email,password) VALUES ("${name}", "${email}", "${password}")`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD USER RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  // static addNewCustomer = async () => {
  //   return new Promise((resolve, reject) => {
  //     const sql = `select * from ${tableName}`;
  //     console.log("SQL: ", sql);
  //     con.query(sql, (error, results) => {
  //       if (error) {
  //         console.log(error);
  //         return reject(error);
  //       }
  //       console.log("ADD USER RESULTS***********: ", results);
  //       return resolve(results);
  //     });
  //   });
  // };

  

  

  static findById = (customerId) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where iduser = ${customerId}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("FIND BY ID CUSTOMER RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static findByEmail = ({
    email,
    password,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where email = "${email}"`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        console.log(results);
        if (results.length>0 && results[0].password==password) {
          return resolve(results);
        }
        console.log("FIND BY ID CUSTOMER RESULTS: ", results);
        return resolve(false);
      });
    });
  };

  static updateCustomerDetails = ({
    iduser,
    phoneNum,
    city,
    street,
    pincode,
    email,
    country,
    image
  }) => {
    console.log(
      "IN UPDATE CUSTOMER PROFILE: ",
      iduser,
      phoneNum,
      city,
      street,
      pincode,
      email,
      country,
      image
    );
    return new Promise((resolve, reject) => {
      const sql = `update ${tableName} set email='${email}',image='${image}',city='${city}',street='${street}',pincode='${pincode}',country='${country}', phoneNum = '${phoneNum}' where iduser = ${iduser}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("UPDATE Customer RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static validate = (user) => {
    console.log("VALIDATE USER: ", user);
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });

    return schema.validate(user);
  };

  static validateLogin = (user) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });

    return schema.validate(user);
  };

  static validateProfileUpdate = (customer) => {
    const schema = Joi.object({
      iduser: Joi.number(),
      phoneNum: Joi.string(),
      street: Joi.string(),
      city: Joi.string(),
      pincode: Joi.string(),
      email: Joi.string().email(),
      country:Joi.string(),
      image:Joi.string()
    });

    return schema.validate(customer);
  };
}

module.exports.Customer = Customer;
