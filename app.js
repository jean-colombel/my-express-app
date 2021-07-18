// Old way

const http = require('http');

http.createServer((_, res) => {
  res.write('My NODEJS Server is live!');
  res.end();
}).listen(4040);
