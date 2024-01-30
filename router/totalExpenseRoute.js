const express = require("express");
const router = express.Router();
const db = require("../connection");
const response = require("../response");

router.get("/expense-date", (req, res) => {
  const sql = `SELECT expense_date, SUM(nominal) AS total_expense FROM expense GROUP BY expense_date`;

  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }

    response(200, result, `GET total expense data by date`, res);
    console.log(`GET total expense grouped by date`);
  });
});

router.get("/category", (req, res) => {
  const sql = `SELECT category, SUM(nominal) AS total_expense FROM expense GROUP BY category`;

  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }

    response(200, result, `GET total expense data grouped by category`, res);
    console.log(`GET total expense grouped by category, OK!`);
  });
});

module.exports = router;
