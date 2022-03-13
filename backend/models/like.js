const con = require("../db");

const tableName = "favouriteproduct";

class Like {
  static checkIfUserLikedRestaurant = async ({ iduserfav, idproductfav }) => {
    return new Promise((resolve, reject) => {
      const sql = `Select * FROM ${tableName} where iduserfav = ${iduserfav} and idproductfav = ${idproductfav}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        console.log(results);
        if (error) {
          console.log(error);
          return reject(error);
        }
        else if (results.length==0) {
          return resolve(false);
        }
        else{
          return resolve(true);
        }
      });
    });
  }

  static addUserLike = async ({ iduserfav, idproductfav }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (iduserfav, idproductfav) VALUES (${iduserfav}, ${idproductfav})`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD LIKE RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static removeUserLike = async ({ iduserfav, idproductfav }) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${tableName} where iduserfav = ${iduserfav} and idproductfav = ${idproductfav}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("DELETE LIKE RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static getUserLikes = async (iduserfav ) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${tableName} join product on ${tableName}.idproductfav=product.idproduct where iduserfav = ${iduserfav} `;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("DELETE LIKE RESULTS: ", results);
        return resolve(results);
      });
    });
  };
}

module.exports.Like = Like;
