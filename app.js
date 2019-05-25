const express = require("express");
const Mongodb = require("mongodb");
const body_parser = require("body-parser");


const app = express();
const MongoClient = require("mongodb").MongoClient;
const urlencodedParser = body_parser.urlencoded({extended: false});
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url,{useNewUrlParser: true});


mongoClient.connect(function(err, client) {
    const db = client.db("fake_taxi");
    const clients = db.collection("clients");
    const orders = db.collection("orders");
    const drivers = db.collection("drivers");

    let user1 = {phone:"+79268507245", name:"Tom", rating:5};
    let driver1 = {name:"Sasha", experience:5, rating:4, age: 25, count_drive: 10};
    let orders1 = {client_id:1, driver_id:1, time_start: 10};


    
    
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

app.post("/register", urlencodedParser, function(request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(` \{ Name: ${request.body.userName}, Address: ${request.body.address}, Time: ${request.body.time} \}`);
});

app.use("/",express.static("views"));


app.listen(3000);