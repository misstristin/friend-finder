// load the things we need
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

// sets up body parser for POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// make assets folder static
app.use(express.static("assets"));

// connects to mysql
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "friendFinder"
  });

// index page 
app.get('/', function(req, res) {
	res.render('pages/index');
});

// gets question data
app.get('/questionsData', function(req, res){
    connection.query("SELECT * FROM questions", function(error, results, body) {
        if (error) throw error;
	    res.json(results);
    });
});

// gets all data for one user
app.get('/compareData/:user', function(req, res){
    connection.query("SELECT * FROM users WHERE user = ?", req.params.user, function(error, results, body) {
        if (error) throw error;
	    res.json(results);
    });
});

// gets all user data
app.get('/users', function(req, res) {
	connection.query(
		"SELECT * FROM users", function(error, results, body) {
        if (error) throw error;
	    res.json(results);
	});
});

// posts answers to mysql db

app.post('/submit', function(req, res){
		var answers = [];
		var answersString;

		answers.push(req.body.ans1);
		answers.push(req.body.ans2);
		answers.push(req.body.ans3);
		answers.push(req.body.ans4);
		answers.push(req.body.ans5);
		answers.push(req.body.ans6);
		answers.push(req.body.ans7);
		answers.push(req.body.ans8);
		answers.push(req.body.ans9);
		answers.push(req.body.ans10);

		answersString = JSON.stringify(answers);
		answersString = answersString.replace(/"/gi, '').replace(/,/gi, '');
		answersString = JSON.parse(answersString);

		connection.query(
		"INSERT INTO users SET user = ?, email = ?, answers = ?", [req.body.user, req.body.email, answersString], 
		function(error, results, body) {
		if (error) throw error;
		res.redirect('/match/' + req.body.user + '/' + answersString);
	});
});

// your match page
app.get('/match/:user/:answers', function(req, res) {
	res.render('pages/match');

	connection.query(
		"SELECT * FROM users WHERE user = ?", [req.params.user], 
		function(error, results, body) {
		if (error) throw error;
		// console.log(results)
	});
});


app.listen(3000, function(){
	console.log('Running on 3000');
});