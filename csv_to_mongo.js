// https://www.npmjs.com/package/csv-reader

const fs = require('fs');
const csvParser = require('csv-parser');

let inputStream = fs.createReadStream('zips.csv', 'utf8');

let json = [];



inputStream
    .pipe(csvParser({ parseNumbers: true, parseBooleans: true, trim: true, headers: false }))
    .on('data', function (row) {
        // console.log('A row arrived: ', row);
        let place = row[0];
        let zip = row[1];
        // console.log(place, zip)

        // if it already exists jsut add the zip
        let alreadyExists = json.find(item => item.place === place);
        if (alreadyExists) {
            console.log("already exists ")
            // make sure zip isn't there (that way I can run this multiple times with diplicates)
            if (!alreadyExists.zips.includes(zip)) {
                alreadyExists.zips.push(zip);
            }
            
        }


        else {
            // else add a new object 
            // upload a new location
            console.log("new place")
            let newplace = {
                place: place,
                zips: [zip]
            };
            let string = JSON.stringify(newplace);
            // console.log(string)
            json.push(JSON.parse(string));

        }

    })
    .on('end', function () {
        console.log('No more rows!');
        console.log(json);
    });


const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb+srv://hope:wHom5wfj8CQoxa5b@cluster0.iqwdvlt.mongodb.net/?retryWrites=true&w=majority&appName=cluster0'
const url = 'mongodb+srv://hope:wHom5wfj8CQoxa5b@cluster0.iqwdvlt.mongodb.net/?retryWrites=true&w=majority&appName=cluster0'
	  




function main() 

{
  MongoClient.connect(url, function(err, db) {
  if(err) { return console.log(err); }
  
    var dbo = db.db("thebestdatabase");
	  var collection = dbo.collection('places');
	  collection.insertMany(json, function(err, res) {
       if (err) { return console.log(err); }
        console.log("new documents inserted");
        db.close();
	});

});
}

main();



