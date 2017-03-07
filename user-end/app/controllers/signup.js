//including dependencies.
var express = require('express');
var mongoose = require('mongoose');
var shortid = require("shortid");

var auth = require('../../middlewares/auth.js');
var validator = require('../../middlewares/validator.js');
var encrypt = require('../../libs/encrypt.js');

var router = express.Router();

//defining model.
var userModel = mongoose.model('User');

//defining controller function.
module.exports.controller = function(app){

  router.get("/signup",auth.loggedIn,function(req,res){
    res.render('signup',
                {
                  title:"User Signup",
                  user:req.session.user,
                  cart:req.session.cart
                });
  });

  //to create user.
  router.post("/api/v1/newuser/create",auth.loggedIn,validator.emailExist,function(req,res){

    var today = Date.now();
    var id = shortid.generate();
    var epass = encrypt.encryptPassword(req.body.password);

    //create user.
    var newUser = new userModel({

      userId : id,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : epass,
      secureQuestion : req.body.secureQuestion,
      secureAnswer : req.body.secureAnswer,
      contact : req.body.contact,
      houseNo : req.body.houseNo,
      city : req.body.city,
      state : req.body.state,
      country : req.body.country,
      pinCode : req.body.pinCode,
      landMark: req.body.landMark,
      createdOn : today,
      updatedOn : today

    });

    newUser.save(function(err,result){
      if(err){
        console.log(err);
        res.render('message',
                    {
                      title:"Error",
                      msg:"Some Error Occured During Creation.",
                      status:500,
                      error:err,
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else if(result == undefined || result == null || result == ""){
        res.render('message',
                    {
                      title:"Empty",
                      msg:"User Is Not Created. Please Try Again.",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else{
        req.user = result;
        delete req.user.password;
        req.session.user = result;
        delete req.session.user.password;
        res.redirect('/');
      }
    });

  });

  app.use('/user',router);

}//end of controller function.
