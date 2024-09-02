const http = require("http");
const PORT = 8082;
// Create a local server to receive data from
const server = http.createServer((req, res) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    // res.write(`${date} ${time}`);
    // res.end();
    // res.end(`${date} ${time}`);
    // res.end(`<h1>Hello</h1>`);
    res.writeHead(200, { 'Content-Type': 'application/json', 'requestId': 1234 })
    res.end(JSON.stringify({
        serverName: "Crio"
    }));
});
  
server.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`)
});