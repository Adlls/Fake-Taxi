const express = require('express');
var session = require("express-session"),
bodyParser = require("body-parser");
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

const Dr = require('./Driver');
const Client = require('./Client');
const mongoose = require('mongoose');
const app = express();
let DriverLogin;
mongoose.connect("mongodb://localhost:27017/fake_taxi", {useNewUrlParser:true});


const Driver = mongoose.model('Driver',{
  name: String,
  exp: Number,
  age: Number,
  count_drive: Number,
  login: String,
  pass: String,
  tel: Number,
  active: Boolean
});

const User = mongoose.model('Client', {
  phone: Number,
  name: String,
  rating: Number
});

const Order = mongoose.model('Order', {
  client_id: Object,
  driver_id: Object,
  time_start: String,
  time_finish: String,
  active: Boolean,
  price: Number,
  distance: Number,
  address: String,
  x: Number,
  y: Number
});


const urlencodedParser = bodyParser.urlencoded({extended: false});
app.set("view engine","hbs");
app.use("/login", express.static("public/auth.html"));
app.use("/", express.static("public"));
app.use("/order", express.static("public/order.html"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Driver.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    Driver.findOne({ login: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
    
      if (!(user.pass === password)) {
        return done(null, false);
      }
      
      return done(null, user);
    });
  }
));

app.post('/login', (req, res) => {
   DriverLogin = req.body.username;

   console.log(DriverLogin);

  Driver.findOne({login: DriverLogin}, (err, drivers) => {
        let driver = new Dr(drivers.name, drivers.tel, drivers.rating, drivers.age);

    Order.find({}, (err, orders) => {
        console.log(driver.getX(0,200));
        res.render('cab.hbs', { 
        user: driver.getName(),
        orders: orders,
        driverX: driver.getX(0,200),
        driverY: driver.getY(0,200)

      });

  });
  Driver.findOneAndUpdate({login: DriverLogin}, {active: true}, (err, drivers) => {});

});

});


//auth drivers in cab
app.post('/login',
  passport.authenticate('local', { successRedirect: '/cab',
                                   failureRedirect: '/login'
                                    })
);
// As with any middleware it is quintessential to call next()
// if the user is authenticated

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}



app.get('/cab', isAuthenticated, function(req, res) {

});

/* Handle Logout */
app.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
  Driver.findOneAndUpdate({login: DriverLogin}, {active: false}, (err, res) => {});

});

function CreateOrder() {
  Order.create({
    client_id: req.idClient,
    driver_id: null,
    time_start: ClientTime,
    time_finish: null,
    active: true,
    price: null,
    distance: null,
    address: ClientAddress,
    x: Math.floor(client.getX(0,100)),
    y: Math.floor(client.getY(0, 100))
  }, function(err, order) {
    res.render('orderw.hbs',{
      id_order: order._id,
      Xclient: client.getX(0,100),
      Yclient: client.getY(0,100)
    
    });
 
  });
}

app.post('/order', function(req, res) {

  if(!req.body) return response.sendStatus(400);
  req.idClient = null;
  let ClientName = req.body.username;
  let ClientPhone = req.body.phone;
  let ClientAddress = req.body.address;
  let ClientTime = req.body.time;
  let client = new Client(ClientName, ClientPhone, 0,0);

  User.find({phone: req.body.phone}, function(err, user) {
//решить проблему с валидацией данных, с помощью созднанных мною классов
//иногда могут возникать ошибки из-з неправильного формата данных
//console.log(req.body.typeor);

    let Xclientg = Math.floor(client.getX(0,150));
    let Yclientg = Math.floor(client.getY(0,150));
      
        if(Object.keys(user).length == 0) {

          User.create({
            name: ClientName, 
            phone: ClientPhone, 
            rating: 0
          }, function(err, user) {

            req.idClient = user._id;
            Order.create({
              client_id: req.idClient,
              driver_id: null,
              time_start: ClientTime,
              time_finish: null,
              active: true,
              price: null,
              distance: null,
              address: ClientAddress,
              x: Xclientg,
              y: Yclientg
            }, function(err, order) {
              res.render('orderw.hbs',{
                id_order: order._id,
                Xclient: Xclientg,
                Yclient: Yclientg
              
              });
          });
        });
      }
        else { 
          req.idClient = user[Object.keys(user).length-1]._id;
        
          Order.create({
            client_id: req.idClient,
            driver_id: null,
            time_start: ClientTime,
            time_finish: null,
            active: true,
            price: null,
            distance: null,
            address: ClientAddress,
            x: Xclientg,
            y: Yclientg
          }, function(err, order) {
            res.render('orderw.hbs',{
              id_order: order._id,
              Xclient: Xclientg,
              Yclient: Yclientg
            
            });
        });
 
        }

  });
});

app.get('/order', function(req, res) {
    //ищем ближайшего водителя
});


app.listen(3000, () => {

});




