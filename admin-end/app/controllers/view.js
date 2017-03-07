//including dependencies.
var express = require('express');
var mongoose = require('mongoose');

var auth = require('../../middlewares/auth.js');

var router = express.Router();

//defining model.
var productModel = mongoose.model('Product');

//defining controller function.
module.exports.controller = function(app){

  //router for product view screen.
  router.get("/view-product",auth.checkLogin,function(req,res){

    productModel.find({},function(err,result){
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
      // else if(result == undefined || result == null || result == ""){
      //   res.render('view-product',
      //               {
      //                 title:"View Product",
      //                 admin:req.session.admin
      //               });
      // }
      else{
        productModel.count({},function(err,count){
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
          else{
            res.render('view-product',
                        {
                          title:"View Product",
                          admin:req.session.admin,
                          product:result,
                          count:count
                        });
          }
        });
      }
    });

  });

  //route to show particular product.
  router.get("/view-product/single/:id",auth.checkLogin,function(req,res){
    //reading particular product document.
    productModel.findOne({"_id":req.params.id},function(err,result){
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
        res.render('view-product-single',
                    {
                      title:"Single Product",
                      admin:req.session.admin,
                      product:null
                    });
      }
      else{
        res.render('view-product-single',
                    {
                      title:"Single Product",
                      admin:req.session.admin,
                      product:result
                    });
      }
    });
  });


  app.use("/admin",router);

}//end of controller function.
