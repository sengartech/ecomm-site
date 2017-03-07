//including dependencies.
var express = require('express');
var mongoose = require('mongoose');

var auth = require('../../middlewares/auth.js');

var router = express.Router();

//defining model.
var orderModel = mongoose.model('Order');

//defining controller function.
module.exports.controller = function(app){

  router.get("/orders",auth.checkLogin,function(req,res){

    orderModel.find({})
              .sort('-orderDate')
              .exec(function(err,result){
                if(err){
                  console.log(err);
                  res.render('message',
                              {
                                title:"Error",
                                msg:"Some Error Occured During Reading.",
                                status:500,
                                error:err,
                                admin:req.session.admin
                              });
                }
                else if(result == undefined || result == null || result == ""){
                  res.render('orders',
                              {
                                title:"Ecomm Admin | Orders",
                                admin:req.session.admin,
                                orders:""
                              });
                }
                else{
                  var length = result.length;
                  // console.log(length);
                  res.render('orders',
                              {
                                title:"Ecomm Admin | Orders",
                                admin:req.session.admin,
                                orders:result,
                                length:length
                              });
                }
              });
  });

  app.use('/admin',router);

}//end of controller function.
