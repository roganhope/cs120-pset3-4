const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb+srv://dbUser1:dbuser123@cluster0.rjmq5.mongodb.net/?retryWrites=true&w=majority";

const url = 'mongodb+srv://hope:wHom5wfj8CQoxa5b@cluster0.iqwdvlt.mongodb.net/?retryWrites=true&w=majority&appName=cluster0'
	  
console.log('hey')
  MongoClient.connect(url, function(err, db) {
    
  if(err) { console.log(err); }
  else {
    var dbo = db.db("library");
	  var collection = dbo.collection('books');
    console.log("Success!");
	  db.close();
  }
});



