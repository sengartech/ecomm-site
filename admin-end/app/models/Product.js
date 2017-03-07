//including dependencies.
var mongoose = require('mongoose');

//declaring schema object.
var Schema = mongoose.Schema;

var productSchema = new Schema({

  productName : {type:String,default:"",required:true},
  category : {type:String,default:"",required:true},
  images : [],
  price : {type:Number,default:"",required:true},
  discount : {type:Number,default:""},
  description : {type:String,default:""},
  quantity : {type:Number,default:0},
  color : {type:String,default:"Black"},
  model : {type:String,default:""},
  brandName : {type:String,default:""},
  size : {type:String,default:""},
  createdOn : {type:Date,default:Date.now},
  updatedOn : {type:Date,default:Date.now}

});

//creating model.
mongoose.model('Product',productSchema);
