var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');


var app = express();

//view engine
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')))

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.get('/', function(req, res) {
  res.render(index);
});

app.post('/users/add', function(req, res) {

  req.checkBody('name', 'name is required').notEmpty;
  req.checkBody('email', 'email is required').notEmpty;

  var errors = req.validationErrors();
  if(errors){
    console.log('errors');
  } else {
    var newUser = {
      name : req.body.name,
      email : req.body.email
    }
    console.log('success');
  }
});

app.listen(3000, function() {
  console.log('server started on port 3000...');
})
