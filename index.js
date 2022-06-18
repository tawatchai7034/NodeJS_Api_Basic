require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const { Client } = require("pg");

app.use(express.json({limit: '50mb'}))

app.get("/", (req, res) => {
  res.send("hello in " + port);
});

app.get("/list", async (req, res) => {
  try {
    const client = new Client({
      user: "vansale",
      host: "10.1.1.58",
      database: "Vansale",
      password: "TcLWUyRfyLkgk4xv",
      port: 5432,
    });

    await client.connect(function (err) {
      if (!err) {
        console.log("Connected to Vansale successfully");
      } else {
        console.log(err.message);
      }
    });

    const result = await client.query(
      'Select * from "TBM_BASKET"'
      // , (err, resp) => {
      //   if (!err) {
      //     res.json(resp.rows);
      //     console.log(resp.rows);
      //   } else {
      //     console.log(err.message);
      //   }

      //   client.end;
      // }
    );

    await client.end();

    res.json(result.rows);

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
      [id,name]
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
