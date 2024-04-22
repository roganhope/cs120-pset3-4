const express = require('express') 
const path = require('path') 
const controller = require('./controllers/controller.js');
const bodyParser = require('body-parser');
const app = express() 


app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.use(express.static('public'));

var favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){ 
    res.render('Home', { 
        title: 'Home Page'
    }) 
}) 


app.post('/process', async function(req, res) {
    const info = req.body.the_name;
    
    try {
        const processedInfo = await controller.processInfo(info);
        res.render('process', { processedInfo: processedInfo });
    } catch (error) {
      
        console.error('Error processing information:', error);
        res.status(500).send('Error processing information');
    }
});

app.listen(8080, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
}) 

