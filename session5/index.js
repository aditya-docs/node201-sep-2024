const express = require("express");
require("dotenv").config();

const connectDB = require("./db/config");
const currencyRouter = require("./routes/currencies.routes");
const userRouter = require("./routes/users.routes");
const blogRouter = require("./routes/blogs.routes");
// const authorize = require("./middlewares/authorize");

const app = express();
const PORT = 8082;

app.use(express.json()); //middleware to parse the request body as JSON, invoked only when the content-type is application/json

connectDB(); // connects to DB

app.get("/", (req, res) => {
  res.send("<h1>Currency database</h1>");
});

app.use("/currencies", currencyRouter);

app.use("/users", userRouter);

app.use("/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
