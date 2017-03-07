//including dependencies.
var express = require('express');
var mongoose = require('mongoose');

var auth = require('../../middlewares/auth.js');
var encrypt = require('../../libs/encrypt.js');

var router = express.Router();

//defining model.
var userModel = mongoose.model('User');

//defining controller function.
module.exports.controller = function(app){

  //router for login screen.
  router.get('/login',auth.loggedIn,function(req,res){
    //console.log("its admin login..");
    res.render('login',
                {
                  title:"User Login",
                  user:req.session.user,
                  cart:req.session.cart
                });
  });

  //router for logout.
  router.get('/logout',function(req,res){

    //to prevent session.cart , i have not used session.destroy.
    req.session.user = null;
    res.redirect('/user/login');
    // req.session.destroy(function(err){
    //   if(err){
    //     res.render('message',
    //                 {
    //                   title:"Error",
    //                   msg:"Some Error Occured During Logout.",
    //                   status:500,
    //                   error:err,
    //                   user:req.session.user,
    //                   cart:req.session.cart
    //                 });
    //   }
    //   else{
    //     //req.session.cart = req.cart;
    //     res.redirect('/user/login');
    //   }
    // });
  });

  //router for login admin.
  router.post('/api/v1/login',auth.loggedIn,function(req,res){

    var epass = encrypt.encryptPassword(req.body.password);

    userModel.findOne({$and:[{'email':req.body.email},{'password':epass}]},function(err,result){
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
                      msg:"User Not Found. Please Check Your Username and Password.",
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
