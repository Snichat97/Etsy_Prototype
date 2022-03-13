const Joi = require("joi");
const con = require("../db");

const tableName = "shop";

class Shop {
  static addNewShop = async ({
    name,
    iduser
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (name,iduser) VALUES ("${name}", "${iduser}")`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD SHOP RESULTS: ", results);
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
  
  static addShopImage = async ({
    image,
    idshop
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${tableName} set image="${image}" where idshop = ${idshop}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD SHOP RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static findUserShops = (iduser) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where iduser = ${iduser}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("FIND USERS SHOPS: ", results);
        return resolve(results);
      });
    });
  };

  static findHomepageShops = (iduser) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("FIND OTHER USER SHOPS: ", results);
        return resolve(results);
      });
    });
  };

  static findShopNameAvailable = (name) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where name = '${name}'`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("FIND OTHER USER SHOPS: ", results);
        return resolve(results);
      });
    });
  };

  static findTotalSales = (shop) => {
    return new Promise((resolve, reject) => {
      const sql = `select sum(product.totalSales*product.price) as totalSales from shop join product on shop.idshop=product.idshop where shop.idshop = '${shop}'`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("FIND OTHER USER SHOPS: ", results);
        return resolve(results);
      });
    });
  };

  // static updateRestaurantDetails = ({
  //   _id,
  //   restaurantName,
  //   email,
  //   street,
  //   city,
  //   state,
  //   country,
  //   zipCode,
  //   phoneNumber,
  //   description,
  //   restaurantImg,
  //   openingTime,
  //   closingTime,
  //   pickupMode,
  //   deliveryMode,
  // }) => {
  //   return new Promise((resolve, reject) => {
  //     const sql = `update ${tableName} set name = "${restaurantName}", street = "${street}", city = "${city}", state = "${state}", country = "${country}", zipCode = "${zipCode}", phoneNumber = "${phoneNumber}", description = "${description}", restaurantImage = "${restaurantImg}", openingTime = "${openingTime}", closingTime = "${closingTime}", pickupMode = "${pickupMode}", deliveryMode = "${deliveryMode}" where _id = ${_id}`;
  //     console.log("SQL: ", sql);
  //     con.query(sql, (error, results) => {
  //       if (error) {
  //         console.log(error);
  //         return reject(error);
  //       }
  //       console.log("ADD RESTAURANT RESULTS: ", results);
  //       return resolve(results);
  //     });
  //   });
  // };

  static validate = (shop) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      iduser: Joi.number().required()
    });

    return schema.validate(shop);
  };

  static validateUpdate = (restaurant) => {
    const schema = Joi.object({
      idshop: Joi.string().required(),
      image: Joi.string().required()
    });

    return schema.validate(restaurant);
  };
}

module.exports.Shop = Shop;
