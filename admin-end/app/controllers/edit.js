//including dependencies.
var express = require('express');
var mongoose = require('mongoose');

var auth = require('../../middlewares/auth.js');

var router = express.Router();

//defining model.
var productModel = mongoose.model('Product');

//defining controller function.
module.exports.controller = function(app){

  //router for product edit screen.
  router.get("/edit-product/:id",auth.checkLogin,function(req,res){
    productModel.findById({'_id':req.params.id},function(err,result){
      if(err){
        console.log(err);
        res.render('message',
                    {
                      title:"Error",
                      msg:"Some Error Occured.",
                      status:500,
                      error:err,
                      admin:req.session.admin
                    });
      }
      else if(result == undefined || result == null || result == ""){
        // console.log("Product Does Not Exist. Please Check Your Input.");
        res.render('message',
                    {
                      title:"Not Found",
                      msg:"Product Does Not Exist. Please Check Your Input.",
                      status:404,
                      error:"",
                      admin:req.session.admin
                    });

      }
      else{
        res.render('edit-product',
                    {
                      title:"Edit Product",
                      admin:req.session.admin,
                      product:result
                    });
      }
    });

  });

  //router for api editing product.
  router.put("/api/v1/product/edit/:id",auth.checkLogin,function(req,res){
    //setting current updated date.
    req.body.updatedOn = Date.now();
    var update = req.body;

    productModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){
      if(err){
        console.log(err);
        res.render('message',
                    {
                      title:"Error",
                      msg:"Some Error Occured During Updation.",
                      status:500,
                      error:err,
                      admin:req.session.admin
                    });
      }
      else if(result == undefined || result == null || result == ""){
        // console.log("Product Does Not Exist. Please Check Your Input.");
        res.render('message',
                    {
                      title:"Not Found",
                      msg:"Product Does Not Exist. Please Check Your Input.",
                      status:404,
                      error:"",
                      admin:req.session.admin
                    });

      }
      else{
        //reading and showing the updated result.
        productModel.findOne({'_id':req.params.id},function(err,newResult){
          res.render('view-product-single',
                      {
                        title:"Single Product",
                        admin:req.session.admin,
                        product:newResult
                      });
        });
      }

    });
  });

  app.use("/admin",router);

}//end of controller function.
