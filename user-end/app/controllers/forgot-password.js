//including dependencies.
var express = require('express');
var mongoose = require('mongoose');

var encrypt = require('../../libs/encrypt.js');
var auth = require('../../middlewares/auth.js');

var router = express.Router();

//defining model.
var userModel = mongoose.model('User');

//defining controller function.
module.exports.controller = function(app){

  //step-one for email entering.
  router.get("/forgot-password/step-one",auth.loggedIn,function(req,res){

    res.render('forgot-password',
                {
                  title:"Forgot Password | Step-One",
                  user:req.session.user,
                  cart:req.session.cart,
                  step:1
                });

  });

  //step-two for security question and answer.
  router.post("/forgot-password/step-two",auth.loggedIn,function(req,res){

    userModel.findOne({'email':req.body.email},function(err,result){
      if(err){
        res.render('message',
                    {
                      title:"Error",
                      msg:"Some Error Occured During Login.",
                      status:500,
                      error:err,
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else if(result == null || result == undefined || result == ""){
        res.render('message',
                    {
                      title:"Error",
                      msg:"User Not Found. Please Check Your Email.",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else{
        res.render('forgot-password',
                    {
                      title:"Forgot Password | Step-Two",
                      user:req.session.user,
                      cart:req.session.cart,
                      step:2,
                      userId:result.userId,
                      question:result.secureQuestion
                    });
      }
    });

  });

  //step-final for password changing.
  router.post("/forgot-password/step-final",auth.loggedIn,function(req,res){

    userModel.findOne({$and:[{'userId':req.body.userId},{'secureAnswer':req.body.secureAnswer}]},function(err,result){
      if(err){
        res.render('message',
                    {
                      title:"Error",
                      msg:"Some Error Occured During Login.",
                      status:500,
                      error:err,
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else if(result == null || result == undefined || result == ""){
        res.render('message',
                    {
                      title:"Error",
                      msg:"User Not Found. Please Check Your Answer.",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else{
        res.render('forgot-password',
                    {
                      title:"Forgot Password | Step-Final",
                      user:req.session.user,
                      cart:req.session.cart,
                      step:3,
                      userId:result.userId
                    });
      }
    });
  });

  //changing password.
  router.put("/forgot-password/change",auth.loggedIn,function(req,res){

    //encrypting provided passwords.
    var epass = encrypt.encryptPassword(req.body.password);

    //setting current updated date.
    req.body.updatedOn = Date.now();
    //saving new encrypted password in req.body.password object.
    req.body.password = epass;

    //saving req.body object in variable.
    var update = req.body;

    //updating password.
    userModel.findOneAndUpdate({'userId':req.body.userId},update,function(err,result){
      if(err){
        console.log(err);
        res.render('message',
                    {
                      title:"Error",
                      msg:"Some Error Occured During Updation.",
                      status:500,
                      error:err,
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else if(result == undefined || result == null || result == ""){
        res.render('message',
                    {
                      title:"Not Found",
                      msg:"User Does Not Exist. Please Check Your Input.",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });

      }
      else{
        //making user login again.
        res.redirect('/user/login');
      }
    });
  });

  app.use("/user",router);

}//end of controller function.
