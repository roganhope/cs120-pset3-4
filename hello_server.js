var http = require('http');

// var port = 8080;

var port = process.env.PORT || 3000;

console.log("tesing!")

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello Strange World!');
    res.write('<h2> helloooo </h2>');
    res.end();

});