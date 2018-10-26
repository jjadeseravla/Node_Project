const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
//const mongojs = require('mongojs');
//const db = mongojs('projectnode', ['users'])
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;


mongoose.connect('mongodb://localhost/projectnode');
let db = mongoose.connection;

//check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

//check for DB errors
db.on('error', function(err){
  console.log(err);
});

const app = express();

//Bring in Models
let User = require('./models/user');

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set static path
app.use(express.static(path.join(__dirname, 'public')))

//global Vars
app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if(err){
      console.log(err);
    }else {
      res.render('index', {
        //title: 'People',
        users: users
      });
    }
  });
  // db.users.find(function(err, docs){
  //   //array for docs in collection
  //   //console.log(docs);
  // })
});

//another page (route)
app.get('/other/page', function(req, res){
  res.render('extra', {
    title: 'Extra Page'
  });
});

app.post('/users/add', function(req, res) {

  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('country', 'country is required').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    res.render('index', {
      errors: errors
    });
  } else {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.country = req.body.country;
    user.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        res.redirect('/');
      }
    });
    // var newUser = {
    //   name: req.body.name,
    //   email: req.body.email,
    //   country: req.body.country
    //}
    // db.users.insert(newUser, function(err, result){
    //   if(err){
    //     console.log(err);
    //   }
    //     //res.render(newUser);
    //     res.redirect('/');
    //
    // })
  }
});

app.delete('/users/delete/:id', function(req, res) {
  db.users.remove({_id: ObjectId(req.params.id)}, function(err){
    if(err) {
      console.log(err);
    }
    res.redirect('/');
  });
})

app.listen(3000, function() {
  console.log('server started on port 3000...');
})
