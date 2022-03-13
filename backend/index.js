const config = require("config");
const user = require("./routes/user");
const shop = require("./routes/shop");
const product = require("./routes/product");
const favourite = require("./routes/like");
const orders = require("./routes/orders");

const mysql = require("mysql2");
var cors = require("cors");

const express = require("express");
const app = express();

var con = mysql.createPool({
  host: config.get("DB.host"),
  user: config.get("DB.username"),
  password: config.get("DB.password"),
  port: config.get("DB.port"),
  database: config.get("DB.database"),
  connectionLimit: 500,
});

con.getConnection((err) => {
  if (err) {
    console.log("Unable to connect to database" + err);
    process.exit(1);
  }
  console.log("Connected to Database");
});

app.use(cors());
app.use(express.json());

app.use("/api/user", user);
app.use("/api/shop", shop);
app.use("/api/product", product);
app.use("/api/favourite", favourite);
app.use("/api/orders", orders);

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listning to port ${port}.... `));
