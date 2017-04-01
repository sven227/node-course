const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//heroku sets env.variable port if not we use 3000
const port = process.env.PORT || 3000;

// ProGit - free Book online
//https://git-scm.com
//new express app
var app = express();

//express related config set tell express we use hbs
app.set('view engine', hbs);

hbs.registerPartials(__dirname + '/views/partials')


// an hbs helperfunction is a function called inside hbs when {{}} is found

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('unable to append to server.log.' + log);
		}
	})
	next();
});

/*app.use((req,res,next) =>{
	res.render('maintenance.hbs');
	// no next(); we want js to stop
});*/

//use middleware dirname passed into our file bye the wrapper function
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	//return 'test';
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// http route handlers
app.get('/', (req, res) => {
	//res.send('<h1>Hello Dudes!</h1>');
	/*	res.send ({
			name: 'sven',
			likes:[
				'programming',
				'electronics',
				'sports'
			]
		});*/
	res.render('home.hbs', {
		pageTitle: 'My Homepage',
		currentYear: new Date().getFullYear(),
		wellcomeMessage: 'Wellcome everyone!'
	})
});

app.get('/about', (req, res) => {
	// render with template view engine
	res.render('about.hbs', {
		pageTitle: 'About Page Sven',
		currentYear: new Date().getFullYear()
	});
});


// register another handler with route /bad
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'unable to handle request',


	});

})

// port 3000 - set by heroku in env variable PORT
app.listen(port, () => {
	console.log(`message up on server ${port}`);
});