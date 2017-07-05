const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;


const app = express();

app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// Mongo middleware
app.use(function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/jmbdb", function(error, db) {
    req.db = db;
    next();
  });
});

  app.get('/', function(req, res) {
    const col = req.db.collection("workers");
    context = {};
    col.find({}).toArray(function(error, results) {
      // console.log(results);
      context.model = results;
      res.render('directory', context);
    });
  });

  app.get('/:id', function(req, res) {
    const col = req.db.collection("workers");
    context = {};
    var id = parseInt(req.params.id);
    // console.log(id);
    col.find({'id': id}).toArray(function(error, results) {
      // console.log(results);
      context.model = results;
      res.render('profile', context);
    });
  });

  app.post('/unemployed', function(req, res) {
    const col = req.db.collection("workers");
    context = {};
    col.find({'job': null}).toArray(function(error, results) {
      console.log(results);
      context.model = results;
      res.render('directory', context);
    });
  });

  app.post('/employed', function(req, res) {
    const col = req.db.collection("workers");
    context = {};
    col.find({'job': {$ne: null}}).toArray(function(error, results) {
      console.log(results);
      context.model = results;
      res.render('directory', context);
    });
  });

  app.listen(3000, function() {
    console.log('Successfully started express application!');
  });


// OLD PROJECT

// app.get('/directory', function(req, res) {
//     // console.log(data);
//   res.render('directory', data);
// });
//
// app.get('/:id', function(req, res) {
//   var user = {};
//   for (var i = 0; i < data.users.length; i++) {
//     user = data.users[i];
//     if (user.id == req.params.id) {
//       break;
//     }
//   }
//   res.render('profile', user);
// });
//
// app.listen(3000, function() {
//   console.log('Successfully started express application!');
// });
