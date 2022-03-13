const con = require("../db");
const { Product } = require("./product");

const tableName = "orders";

class Orders {
  static addNewOrder = async (
    userId,
  ) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (userId) VALUES (${userId})`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD ORDER RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static getUserOrders = async (iduser) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT shop.name as shopName,product.photo,orderproduct.purchasedquantity,orderproduct.purchasedprice,orders.idorder,product.name FROM orders join orderproduct on orders.idorder=orderproduct.idorder join product on orderproduct.idproduct=product.idproduct join shop on product.idshop=shop.idshop where userId=${iduser} order by idorder`;
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


static alterAllProducts = async(product,productData) => {
  return new Promise((resolve, reject) => {
    console.log(product,productData,product[0].quantity)
    const quan = product[0].quantity-productData.purchasedquantity
    const ts = product[0].totalSales+productData.purchasedquantity
    console.log(quan,ts)
    const sql = `UPDATE product set quantity=${quan},totalSales=${ts} where idproduct=${productData.idproduct}`;
    console.log(sql)
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

module.exports.Orders = Orders;
