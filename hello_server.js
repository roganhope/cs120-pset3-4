var http = require('http');

var port = 8080;

console.log("tesing!")

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello Strange World!');
    res.end();

});