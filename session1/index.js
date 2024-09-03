const http = require("http");
const currenciesJSON = require("./currencies.json");
const PORT = 8082;
// Create a local server to receive data from
const server = http.createServer((req, res) => {
  // const date = new Date().toLocaleDateString();
  // const time = new Date().toLocaleTimeString();
  // res.write(`${date} ${time}`);
  // res.end();
  // res.end(`${date} ${time}`);
  // res.end(`<h1>Hello</h1>`);
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Currency Database</h1>");
      break;
    case "/currencies":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(currenciesJSON.data));
      break;
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Couldn't find a matching route",
        })
      );
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});
