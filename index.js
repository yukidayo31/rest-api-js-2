const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/expenses", (req, res) => {
  const sql = "SELECT * FROM expense";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }

    response(200, result, "GET all expenses list, success!", res);
    console.log("GET all expenses list, OK!");
  });
});

app.get("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM expense WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    response(200, result, `GET expense data id = ${id}`, res);
    console.log(`GET expense id = ${id}, OK!`);
  });
});

app.get("/expenses/total/expense-date", (req, res) => {
  const sql = `SELECT expense_date, SUM(nominal) AS total_expense FROM expense GROUP BY expense_date`;

  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }

    response(200, result, `GET total expense data by date`, res);
    console.log(`GET total expense grouped by date`);
  });
  // res.send(`Successfully GET total expense by date ${date}`);
});

app.get("/expenses/total/category", (req, res) => {
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

app.post("/expenses", (req, res) => {
  const { name, nominal, category, expenseDate } = req.body;
  const sql = `INSERT INTO expense(name, nominal, category, expense_date) VALUES ('${name}', ${nominal}, '${category}', '${expenseDate}')`;

  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    if (result.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        details: req.body,
      };
      response(200, data, `ADD new expense, OK`, res);
      console.log("Successfully ADD new expense data!");
    } else {
      response(404, "user not found", `Failed to ADD data`, res);
      console.log("Failed to ADD data");
    }
  });
});

app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const { name, nominal, category, expenseDate } = req.body;
  const sql = `UPDATE expense SET name = '${name}', nominal = ${nominal}, category = '${category}', expense_date = '${expenseDate}' WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        messsage: result.messsage,
        details: req.body,
      };
      response(200, data, `UPDATE expense id = ${id}, OK!`, res);
      console.log(`Successfully UPDATE expense with id = ${id}`);
    } else {
      response(404, "user not found", `Failed to UPDATE data`, res);
      console.log("Failed to UPDATE data");
    }
  });
});

app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM expense where id =${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    if (result.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
      };
      response(200, data, `DELETE expense data id = ${id}, OK!,`, res);
      console.log(`Successfully DELETE expense data id = ${id}`);
    } else {
      response(404, "user not found", `Failed to DELETE data`, res);
      console.log("Failed to DELETE data");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app running on port ${port}`);
});
