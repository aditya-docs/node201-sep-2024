const express = require("express");
require("dotenv").config();

const currencyRouter = require("./routes/currencies.routes");
const userRouter = require("./routes/users.routes");

const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency database</h1>");
});

app.use("/currencies", currencyRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
