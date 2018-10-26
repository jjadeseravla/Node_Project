var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('projectnode', ['users'])
var ObjectId = mongojs.ObjectId;

var app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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
  db.users.find(function(err, docs){
    //array for docs in collection
    //console.log(docs);
    res.render('index', {
      //title: 'People',
      users: docs
    });
  })
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
    var newUser = {
      name: req.body.name,
      email: req.body.email,
      country: req.body.country
    }
    db.users.insert(newUser, function(err, result){
      if(err){
        console.log(err);
      }
        //res.render(newUser);
        res.redirect('/');

    })
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
