const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://hope:wHom5wfj8CQoxa5b@cluster0.iqwdvlt.mongodb.net/?retryWrites=true&w=majority&appName=cluster0'

const processInfo = (input) => {
    return new Promise((resolve, reject) => {
        var zipcode = true;
        if (!isNaN(input)) {
            console.log(`Received input from form: ${input} (Number)`);
            getDataByZip(input)
                .then(data => resolve(data)) 
                .catch(error => reject(error)); 
        } else {
            console.log(`Received input from form: ${input} (String)`);
            getDataByPlace(input)
                .then(data => resolve(data)) 
                .catch(error => reject(error)); 
        }
    });
};

const getDataByZip = async (input) => {
    console.log('Getting data by zip');
    const zip = parseInt(input);
    

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, async (err, db) => {
            if (err) {
                console.error(err);
                reject(err); // reject and send back the error 
                return;
            }
            try {
                var dbo = db.db("thebestdatabase");
                var collection = dbo.collection('places');
                const result = await collection.findOne({ zips: { $in: [input] } });
                console.log('Data:', result);
                if (!result){
                    resolve(null)
                }
                resolve(result); // send back the result 
            } catch (error) {
                console.error('Error retrieving data:', error);
                reject(error); 
            } finally {
                db.close();
            }
        });
    });
};


const getDataByPlace = (input) => {
    console.log('Getting place');
    // some string editing to make it match the DB format 
    const capitalized = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    console.log(capitalized);

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, async (err, db) => {
            if (err) {
                console.error(err);
                reject(err); // reject and send back the error 
                return;
            }
            try {
                var dbo = db.db("thebestdatabase");
                var collection = dbo.collection('places');
                const result = await collection.findOne({ place: capitalized });
                console.log('Data:', result);
                if (!result){
                    resolve(null)
                }
                resolve(result); // send back the result 
            } catch (error) {
                console.error('Error retrieving data:', error);
                reject(error); 
            } finally {
                db.close();
            }
        });
    });
};

module.exports = { processInfo };




