const express = require('express');
const router = express.Router();

//Bring in User Models
let User = require('../models/user');


//get single users
router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, user) { //in brackets to get id thats in URL use req.params
    res.render('user', {
      user:user
    });
  });
});

//another page (route)
router.get('/other/page', function(req, res){
  res.render('extra', {
    title: 'Extra Page'
  });
});

router.post('/add', function(req, res) {

console.log("**********!!!!!!!!!!!!!************");

  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('country', 'country is required').notEmpty();

  //get errors if any
  let errors = req.validationErrors();
  let users = {};

  if(errors){
    console.log("**********!!!!!!ONEEEEEE!!!!!!!************");
    res.render('index', {
      errors: errors,
      users: users
    });
  } else {
    console.log("**********!!!!!!TWOOOO!!!!!!!************");
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.country = req.body.country;

    user.save(function(err){
      if(err){
        console.log("**************THREEEEE******************");
        console.log(err);
        return;
      } else {
        console.log("**********!!!!!!FOURRRRR!!!!!!!************");
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

//Load edit form
router.get('/edit/:id', function(req, res){
  User.findById(req.params.id, function(err, user) { //in brackets to get id thats in URL use req.params
    res.render('edit_user', {
      title: 'Edit User',
      user:user
    });
  });
});

//Update submit post route
router.post('/edit/:id', function(req, res) {
  // req.checkBody('name', 'name is required').notEmpty();
  // req.checkBody('email', 'email is required').notEmpty();
  // req.checkBody('country', 'country is required').notEmpty();
  //
  // var errors = req.validationErrors();
  // if(errors){
  //   res.render('index', {
  //     errors: errors
  //   });
  // } else {

    let user = {}; //User.find({}, function(err, users) {
      //grAB USERS PLURAL FROM APP..JS AND MAKE

    //let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.country = req.body.country;

    let query = {_id:req.params.id}

    User.update(query, user, function(err){
      if(err){
        console.log(err);
        return;
      } else {
        console.log(User);
        res.redirect('/');
      }
    });
  //}
});

router.delete('/delete/:id', function(req, res){
  let query =  {_id:req.params.id}

  User.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Sent a 200 status so its ok');
    console.log('WHEREEEEEEEEE DELEEEEEEETTEEEEEE');
  });
});
// router.delete('/users/delete/:id', function(req, res) {
//   db.users.remove({_id: ObjectId(req.params.id)}, function(err){
//     if(err) {
//       console.log(err);
//     }
//     res.redirect('/');
//   });
// })

module.exports = router; //to access module from outside
