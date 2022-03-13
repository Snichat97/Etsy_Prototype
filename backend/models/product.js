const con = require("../db");
const Joi = require("joi");

const tableName = "product";

class Product {
  static addNewProduct = async ({
    name,
    photo,
    category,
    description,
    price,
    quantity,
    idshop
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (name,photo,category,description,price,quantity,idshop) VALUES ("${name}", "${photo}", "${category}", "${description}", ${price},${quantity},${idshop})`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD PRODUCT RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static findByShopId = async (shopId) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where idshop = ${shopId}`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("GET PRODUCTS OF THE SHOP RESULTS: ", results);
        return resolve(results);
      });
    });
  };
  
  static findById = async (productId) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where idproduct = ${productId}`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("GET PRODUCT INFO: ", results);
        return resolve(results);
      });
    });
  };

  static getAll = async (productId) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName}`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("GET PRODUCT INFO: ", results);
        return resolve(results);
      });
    });
  };


  static updateProductDetails = async ({
    name,
    photo,
    category,
    description,
    price,
    quantity,
    idproduct
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `update ${tableName} set name = '${name}', photo = '${photo}', price = ${price}, description = '${description}', category = '${category}', quantity = ${quantity} where idproduct = ${idproduct}`;
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

  // static addNewDish = async ({
  //   name,
  //   mainIngrediant,
  //   image,
  //   price,
  //   description,
  //   category,
  //   type,
  // }) => {
  //   return new Promise((resolve, reject) => {
  //     const sql = `INSERT INTO ${tableName} (_restaurantId, name, mainIngrediant, image, price, description, category, type) VALUES ("${_restaurantId}", "${name}", "${mainIngrediant}", "${image}", "${price}", "${description}", "${category}", "${type}")`;
  //     console.log("SQL: ", sql);
  //     con.query(sql, (error, results) => {
  //       if (error) {
  //         console.log(error);
  //         return reject(error);
  //       }
  //       console.log("ADD DISHES RESULTS: ", results);
  //       return resolve(results);
  //     });
  //   });
  // };

//   static deleteDish = async (_dishId) => {
//     return new Promise((resolve, reject) => {
//       const sql = `DELETE FROM ${tableName} WHERE _id = '${_dishId}'`;
//       console.log("SQL: ", sql);
//       con.query(sql, (error, results) => {
//         if (error) {
//           console.log(error);
//           return reject(error);
//         }
//         console.log("DELETE DISHES RESULTS: ", results);
//         return resolve(results);
//       });
//     });
//   };

  static validate = (dish) => {
    const schema = Joi.object({
      name:Joi.string().required(),
      photo:Joi.string().required(),
      category:Joi.string().required(),
      description:Joi.string().required(),
      price: Joi.number().required(),
      quantity:Joi.number().required(),
      idshop:Joi.number().required()
    });
    return schema.validate(dish);
  };

static validateUpdate = (dish) => {
  const schema = Joi.object({
    name:Joi.string().required(),
    photo:Joi.string().required(),
    category:Joi.string().required(),
    description:Joi.string().required(),
    price: Joi.number().required(),
    quantity:Joi.number().required(),
    idproduct:Joi.number().required()
  });
  return schema.validate(dish);
};
}
module.exports.Product = Product;
