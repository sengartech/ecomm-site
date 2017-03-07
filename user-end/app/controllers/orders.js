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
              .where('orderedBy').equals(req.session.user.userId)
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
                                user:req.session.user,
                                cart:req.session.cart
                              });
                }
                else if(result == undefined || result == null || result == ""){
                  res.render('orders',
                              {
                                title:"Ecomm Site | Orders",
                                user:req.session.user,
                                cart:req.session.cart,
                                orders:""
                              });
                }
                else{
                  var length = result.length;
                  // console.log(length);
                  res.render('orders',
                              {
                                title:"Ecomm Site | Orders",
                                user:req.session.user,
                                cart:req.session.cart,
                                orders:result,
                                length:length
                              });
                }
              });
  });

  app.use('/user',router);

}//end of controller function.
