//including dependencies.
var mongoose = require('mongoose');

//declaring schema object.
var Schema = mongoose.Schema;

var adminSchema = new Schema({

  username : {type:String,default:"",required:true,unique:true},
  firstName : {type:String,default:"",required:true},
  lastName : {type:String,default:"",required:true},
  email : {type:String,default:"",required:true,unique:true},
  password : {type:String,default:"",required:true},
  createdOn : {type:Date,default:"",required:true}

});

//creating model.
mongoose.model('Admin',adminSchema);
