//including dependencies.
var express = require('express');
var mongoose = require('mongoose');

var auth = require('../../middlewares/auth.js');

var router = express.Router();

//defining model.
var productModel = mongoose.model('Product');

//defining controller function.
module.exports.controller = function(app){

  //router for api deleting product.
  router.post("/api/v1/product/delete/:id",auth.checkLogin,function(req,res){
    productModel.remove({'_id':req.params.id},function(err,result){
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
                      admin:req.session.admin
                    });
      }
      else if(result == undefined || result == null || result == "" || newResult.n == 0){
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
        console.log("Product Deletion Success.");
        res.render('message',
                    {
                      title:"Delete Success",
                      msg:"Product Deletion Success.",
                      status:200,
                      error:"",
                      admin:req.session.admin
                    });
      }
    });
  });

  app.use("/admin",router);

}//end of controller function.
