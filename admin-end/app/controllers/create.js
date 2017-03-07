//including dependencies.
var express = require('express');
var mongoose = require('mongoose');

var auth = require('../../middlewares/auth.js');

var router = express.Router();

//defining model.
var productModel = mongoose.model('Product');

//defining controller function.
module.exports.controller = function(app){

  //router for product creation screen.
  router.get("/create-product",auth.checkLogin,function(req,res){
    res.render('create-product',
                {
                  title:"Create Product",
                  admin:req.session.admin
                });
  });

  //router for api product creation.
  router.post("/api/v1/product/create",function(req,res){

    var today = Date.now();

    //create product.
    var newProduct = new productModel({

      productName : req.body.productName,
      category : req.body.category,
      price : req.body.price,
      description : req.body.description,
      quantity : req.body.quantity,
      color : req.body.color,
      model : req.body.model,
      brandName : req.body.brandName,
      size : req.body.size,
      createdOn : today,
      updatedOn : today

    });

    //saving details.
    newProduct.save(function(err,result){
      if(err){
        console.log(err);
        res.render('message',
                    {
                      title:"Error",
                      msg:"Some Error Occured During Creation.",
                      status:500,
                      error:err,
                      admin:req.session.admin
                    });
      }
      else if(result == undefined || result == null || result == ""){
        res.render('message',
                    {
                      title:"Empty",
                      msg:"Product Is Not Created. Please Try Again.",
                      status:404,
                      error:"",
                      admin:req.session.admin
                    });
      }
      else{
        res.redirect('/admin/view-product');
      }
    });

  });

  app.use("/admin",router);

}//end of controller function.
