const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('config');//we load the db location from the JSON files
//const mongojs = require('mongojs');
//const db = mongojs('projectnode', ['users'])
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const testing = config.util.getEnv('NODE_ENV');
console.log(testing);

//mongoose.connect('mongodb://localhost/projectnode');
mongoose.connect(config.DBHost);
//console.log(config);
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

// //Express Session Middleware
// app.user(session({
//   secret: 'keyboard cat',
//   resave: true, //resave forces session to be resaved back to session store, even if session wasnt modified during request
//   saveUninitialized: true, //forces session that uninitialized to be saved to store even if have not been modified
// }));

//Express Messages Middleware sets a gloabl var called messages to express messages module
// app.use(require('connect-flash')());
// app.use(function(req, res, next){
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });

//Express validator Middleware
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

//Home route
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

//Router Files
let users = require('./routes/users');
app.use('/users', users);

app.listen(3000, function() {
  console.log('server started on port 3000...');
})

// module.exports = app.listen(3000);
//if(!module.parent){ app.listen(3000); }
