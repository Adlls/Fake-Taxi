const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();
const DB = require("./DB");
const process = require("process");
//var mongoose = require("mongoose");

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());


let db = new DB("mongodb://localhost:27017/", (process.env.DB_NAME || "fake_taxi"));
let dbClient;
let Clients;
let Drivers;
let Orders;

//console.log(db.getNameDB());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


db.getConnect().connect(function(err, client) {
      dbClient = client;
      const dbs = client.db(db.getNameDB());
      Clients =  dbs.collection("clients");
      Drivers =  dbs.collection("drivers");
      Orders =   dbs.collection("orders");
      app.listen(3000, () => {
        console.log("Connect to server...");
      })
    
});


/*
mongoClient.connect(function(err, client) {
    const db = client.db("fake_taxi");
    const clients = db.collection("clients");
    const orders = db.collection("orders");
    const drivers = db.collection("drivers");

    let user1 = {phone:"+79268507245", name:"Tom", rating:5};
    let driver1 = {name:"Sasha", experience:5, rating:4, age: 25, count_drive: 10};
    let orders1 = {client_id:1, driver_id:1, time_start: 10};


    
    /*
    clients.insertOne(user1,function(err, result) {
      console.log(result.ops); 
    });

    drivers.insertOne(user1,function(err, result) {
      console.log(result.ops); 
    });

    orders.insertOne(user1,function(err, result) {
      console.log(result.ops); 
    });

    if(err) return console.log(err);
    client.close();
    
});
*/

/*
app.post("/register", urlencodedParser, function(request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(` \{ Name: ${request.body.userName}, Address: ${request.body.address}, Time: ${request.body.time} \}`);
});
*/

//initial static file
app.use("/",express.static("views"));
app.use("/auth",express.static("views/auth.html"));
app.use("/order", express.static("views/order.html"));


app.post("/auth", urlencodedParser, function(request, response) {
      const {login, pass} = request.body;
     
      console.log(login);

      Drivers.find({login}).toArray(function(err,res) {
        if (err) console.log(err);
        console.log(res);
      });
      
      response.send(login +" "+pass);
});

app.post("/order", urlencodedParser, function(request, response) {
        response.send("kek");
});





// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});