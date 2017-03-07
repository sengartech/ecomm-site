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

  //router to show settings screen.
  router.get("/settings",auth.checkLogin,function(req,res){
    res.render('settings',
                {
                  title:"Ecom Site",
                  user:req.session.user,
                  cart:req.session.cart
                });
  });

  //router to modify email.
  router.put("/account/modify/:userId",auth.checkLogin,function(req,res){

    //setting current updated date.
    req.body.updatedOn = Date.now();
    var update = req.body;
    userModel.findOneAndUpdate({'userId':req.params.userId},update,function(err,result){
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
        //reading and showing the updated result.
        userModel.findOne({'userId':req.params.userId},function(err,newResult){

          if(err){
            console.log(err);
            res.render('message',
                        {
                          title:"Error",
                          msg:"Data Updated. But Some Error Occured In Reading Updated Data.",
                          status:500,
                          error:err,
                          user:req.session.user,
                          cart:req.session.cart
                        });
          }
          else{
            //resaving session data.
            req.user = newResult;
            delete req.user.password;
            req.session.user = newResult;
            delete req.session.user.password;

            res.redirect('/user/settings');
          }
        });
      }
    });

  });

  //router to change password.
  router.put("/change/password/:userId",auth.checkLogin,function(req,res){

    //encrypting provided passwords.
    var eoldPass = encrypt.encryptPassword(req.body.oldPassword);
    var epass = encrypt.encryptPassword(req.body.password);

    //setting current updated date.
    req.body.updatedOn = Date.now();
    //saving new encrypted password in req.body.password object.
    req.body.password = epass;
    //deleting oldPassword field from req.body object.
    delete req.body.oldPassword;
    //saving req.body object in variable.
    var update = req.body;

    //finding user.
    userModel.findOne({$and:[{'userId':req.params.userId},{'password':eoldPass}]},function(err,result){
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

        //updating password.
        userModel.findOneAndUpdate({'userId':req.params.userId},update,function(err,newResult){
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
          else{
            //finding updated data.
            userModel.findOne({'userId':req.params.userId},function(err,updatedResult){
              if(err){
                console.log(err);
                res.render('message',
                            {
                              title:"Error",
                              msg:"Password Updated. But Some Error Occured During Session Resave.",
                              status:500,
                              error:err,
                              user:req.session.user,
                              cart:req.session.cart
                            });
              }
              else{
                //resaving session data.
                req.user = updatedResult;
                delete req.user.password;
                req.session.user = updatedResult;
                delete req.session.user.password;
              }
            });

            //making user logout on password change.So as to login again.
            res.redirect('/user/logout');
          }
        });
      }
    });
  });

  //router to delete account.
  router.post("/account/delete/:userId",auth.checkLogin,function(req,res){
    userModel.remove({'userId':req.params.userId},function(err,result){
      //parsing JSON data for accessing fields of result.
      var newResult = JSON.parse(result);

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
      else if(result == undefined || result == null || result == "" || newResult.n == 0){
        res.render('message',
                    {
                      title:"Not Found",
                      msg:"Product Does Not Exist. Please Check Your Input.",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });

      }
      else{
        console.log("User Deletion Success.");
        //making user logout on Deleting account.
        res.redirect('/user/logout');
      }
    });
  });

  app.use('/user',router);

}//end of controller function.
