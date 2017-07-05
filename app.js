const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;


const app = express();

app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

MongoClient.connect("mongodb://localhost:27017/jmbdb", function(error, db) {
  const col = db.collection("workers");
  // col.find({}).toArray(function(error, results) {
    // console.log(results);
  // });
  // console.log(col);

  app.get('/', function(req, res) {
    col.find({}).toArray(function(error, results) {
      // console.log(results);
      res.render('directory', results);
    });
  });
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

  app.listen(3000, function() {
    console.log('Successfully started express application!');
  });


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
