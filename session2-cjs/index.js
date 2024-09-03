const express = require("express");
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("./controllers/currencies.controllers");

const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency database</h1>");
});

app.get("/currencies", getCurrencies);

app.get("/currencies/:symbol", getCurrencyBySymbol);

// app.get("/post/:postId/comments/:commentId", (req, res) => {
//   console.log(req.params);
//   res.send(currenciesJSON.data);
// });

// app.post("/currencies", (req, res) => {
//   res.send("POST CALL MADE");
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
