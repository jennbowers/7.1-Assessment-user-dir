const MongoClient = require("mongodb").MongoClient;
const data = require('./data.js');

MongoClient.connect("mongodb://localhost:27017/jmbdb", function(error, db) {
  // console.log(error);
  const col = db.collection("workers");

var directory = [];

data.users.forEach(function(users) {
  // console.log(users);
  directory.push(users);
  // console.log(directory);
});

col.insertMany(directory);



  // col.insertMany([data.users.forEach(function(users) {
  //   console.log(users);
  //   return users;
  // })
  // ]
  // );

  // since it's javascript it's running asyncronously so we need to call a callback function to give us the results in a format we can read
  // col.find({}).toArray(function(error, results) {
    // console.log(results);
  // });

//   col.findOne({}, function(error, results) {
//     console.log(results);
//   });
//
// col.insert({name: "Joel", hair: "frizzy"})
//
//
});
