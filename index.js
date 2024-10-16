const express = require("express");
const app = express();
const port = 3000;
let shopingRouter = require("./routes/shoping.route");

const { Client } = require("pg");

var mysql = require("mysql");
const cors = require("cors");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "localdb",
  port: 3306,
});

con.connect(function (err) {
  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
  if (err) throw err;
  // con.query("SELECT * FROM tr_text", function (err, result, fields) {
  //   if (err) throw err;
  //   console.log(result);
  // });
});
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use('/shoping',shopingRouter);
app.get("/", (req, res) => {
  res.send("hello in " + port);
});

app.get("/All", async (req, res) => {
  try {
    await con.query("SELECT * FROM tr_text", function (err, result, fields) {
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
});

app.get("/textUpercase", async (req, res) => {
  try {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    await con.query("SELECT * FROM tr_text", function (err, result, fields) {
      if (err) {
        let reponse = {
          code: 400,
          message: "error",
          result: err,
        };
        res.json(reponse);
      } else {
        let list = result;
        if (list.length > 0) {
          list.forEach(async (e) => {
            let textUper = capitalizeFirstLetter(e.text_str);
            let sql = `UPDATE tr_text SET text_str = '${textUper}' WHERE id = ${e.id}`;
            // console.log(sql);
            await con.query(sql, function (err, result, fields) {
              // if (err) {
              //   let reponse = {
              //     code: 400,
              //     message: "error",
              //     result: err,
              //   };
              //   res.json(reponse);
              // } else {
              //   let reponse = {
              //     code: 200,
              //     message: "success",
              //     result: [],
              //   };
              //   res.json(reponse);
              // }
            });
          });
        }
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
});

app.post("/createText", async (req, res) => {
  try {
    let body = req.body;
    if (body.text_str != " ") {
      let sql = `INSERT INTO tr_text(text_str,text_repeat,start_end_text,length,max_repeat)`;
      sql += `VALUES('${body.text_str}','${body.text_repeat}','${body.start_end_text}','${body.length}','${body.max_repeat}');`;
      await con.query(sql, function (err, result, fields) {
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
            result: result.insertId,
          };
          res.json(reponse);
        }
      });
    } else {
      let reponse = {
        code: 400,
        message: "text emtity",
        result: [],
      };
      res.json(reponse);
    }

    // console.log(result.rows);
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
});

app.get("/getlist", async (req, res) => {
  try {
    const client = new Client();

    await client.connect(function (err) {
      if (!err) {
        console.log("Connected to Vansale successfully");
      } else {
        console.log(err.message);
      }
    });

    var id = req.query.id;

    const result = await client.query(
      `Select * from "TBM_BASKET" WHERE "cBASKCD"=$1`,
      [id]
    );

    await client.end();

    res.json(result.rows);
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
});

app.get("/getparam/:id", async (req, res) => {
  try {
    const client = new Client();

    await client.connect(function (err) {
      if (!err) {
        console.log("Connected to Vansale successfully");
      } else {
        console.log(err.message);
      }
    });

    var id = req.params.id;

    const result = await client.query(
      `Select * from "TBM_BASKET" WHERE "cBASKCD"=$1`,
      [id]
    );

    await client.end();

    res.json(result.rows);
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
});

app.post("/getpost", async (req, res) => {
  try {
    const client = new Client();

    await client.connect(function (err) {
      if (!err) {
        console.log("Connected to Vansale successfully");
      } else {
        console.log(err.message);
      }
    });

    var id = req.body.id;

    const result = await client.query(
      `Select * from "TBM_BASKET" WHERE "cBASKCD"=$1`,
      [id]
    );

    await client.end();

    res.json(result.rows);
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
});

app.post("/doubleParametor/:id", async (req, res) => {
  try {
    const client = new Client();

    await client.connect(function (err) {
      if (!err) {
        console.log("Connected to Vansale successfully");
      } else {
        console.log(err.message);
      }
    });

    var id = req.params.id;
    var name = req.body.name;

    const result = await client.query(
      `Select * from "TBM_BASKET" WHERE "cBASKCD"=$1 AND "cBASKNM"=$2`,
      [id, name]
    );

    await client.end();

    res.json(result.rows);
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
