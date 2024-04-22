var http = require('http');
// var port = process.env.PORT || 3000;
var port = 8080;


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello!');
  res.end();
}).listen(port);