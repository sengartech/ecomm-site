//including dependencies.
var express = require('express');
var mongoose = require('mongoose');
var sync = require('synchronize');

var auth = require('../../middlewares/auth.js');

var router = express.Router();

//defining model.
var adminModel = mongoose.model('Admin');
var productModel = mongoose.model('Product');
var userModel = mongoose.model('User');
var orderModel = mongoose.model('Order');

//defining controller function.
module.exports.controller = function(app){

  //router for dashboard page.
  router.get("/",auth.checkLogin,function(req,res){
    //console.log("its admin dashboard..");

    // //counting product.
    // var count1 = 0;
    // productModel.count({},function(err,count){
    //   console.log("total product (in):"+count);
    //   count1 = count;
    // });
    // console.log("total product (out):"+count1);

    //synchronize
    try{
      sync.fiber(function(){
        obj1 = sync.await(productModel.count({},sync.defer()));
        obj2 = sync.await(userModel.count({},sync.defer()));
        obj3 = sync.await(orderModel.count({},sync.defer()));
        obj4 = sync.await(orderModel.count({'deliveryStatus':1},sync.defer()));

        // console.log("total product (in):"+obj1+" "+obj2+" "+obj3);
        res.render('dashboard',
                    {
                      title:"Admin Dashboard",
                      admin:req.session.admin,
                      totalProduct:obj1,
                      totalUser:obj2,
                      totalOrder:obj3,
                      pendingOrder:obj4
                    });
      });
    } catch(err){
        console.log("catch error is "+err);
    }

  });


  //route to create a admin.
  router.post("/create",function(req,res){

    //getting current date.
    var today = Date.now();

    var newAdmin = new adminModel({

      username : req.body.username,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password,
      createdOn : today

    });
    //saving new blog.
    newAdmin.save(function(err,result){
      if(err){
        res.send("Some Error Occured During Creation.");
      }
      else if(result == null || result == undefined || result == ""){
        res.send("Admin Is Not Created.");
      }
      else{
        res.send(result);
      }
    });
  });


  app.use("/admin",router);

}//end of controller function.
