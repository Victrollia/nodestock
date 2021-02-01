//Stock Market Portfolio App by Victoria Cadogan

const express = require('express');
const exphbs  = require('express-handlebars');
//create an express isntance called app 
const app = express()
const path = require('path');
const PORT = process.env.PORT || 5000;
const request = require('request');
const bodyParser = require('body-parser');

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//create call_api function
function call_api(finishedAPI, ticker) {
	request('https://cloud-sse.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_9d0069978cca4c4685b658b67dfbefb3', {json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});	
};


//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff"

//set handlebar index GET routes
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
    	res.render('home', {
    	stock: doneAPI
    });	
  }, "fb");   
});

//set handlebar index POST routes
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
    	//posted_stuff = req.body.stock_ticker;
    	res.render('home', {
    	stock: doneAPI,
    });	
  }, req.body.stock_ticker);    
});

//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
