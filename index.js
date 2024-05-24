var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');
const admin   = require('./admin.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already exists');
                res.send('User already exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});



// FIREBASE verify token at the root route - ADDED 5.6
app.get('/authentication', function(req,res){
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);

    if (!idToken) {
      res.status(401).send();
      return
    } 
    //check, did they pass us the token? if not, do a 401 error
    //check if verify id token was successful if not, do 401
    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            res.send('Authentication Success!');
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
});



// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = process.env.PORT;
app.listen(port);
console.log('Running on port: ' + port);