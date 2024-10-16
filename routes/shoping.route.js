let express = require("express");
let shopingRouter = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "localdb",
  port: 3306,
});

con.connect(function (err) {
  if (err) throw err;
});
shopingRouter.get('/products', async (req, res) =>{
    try {
        await con.query("SELECT * FROM tb_product WHERE `status` = 'ACTIVE'", function (err, result, fields) {
          if (err) {
            let reponse = {
              code: 400,
              message: "error",
              result: err,
            };
            res.json(reponse);
          } else {
            let reponse = {
              code: 200,
              message: "success",
              result: result,
            };
            res.json(reponse);
          }
        });
        // console.log(result.rows);
      } catch (err) {
        const result = {
          success: false,
          message: err,
        };
        res.json(result);
      }
})

module.exports = shopingRouter;
