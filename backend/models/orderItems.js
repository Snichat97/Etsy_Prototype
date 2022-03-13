const con = require("../db");

const tableName = "orderproduct";

class OrderItems {
  static addNewOrderItem = async ({ idorder, idproduct, purchasedquantity, purchasedprice }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (idorder, idproduct, purchasedquantity, purchasedprice) VALUES (${idorder},${idproduct},${purchasedquantity},${purchasedprice})`;
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

  static getOrderItemsInAnOrder = async ({ idorder }) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where idorder = ${idorder}`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("GET Customer orders RESULTS: ", results);
        return resolve(results);
      });
    });
  };
}

module.exports.OrderItems = OrderItems;
