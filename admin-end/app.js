//including dependencies.
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var methodOverride = require('method-override');
var path = require('path');
var fs = require('fs');

var auth = require('./middlewares/auth.js');

//making express app.
var app = express();

//logging all requests.
app.use(logger('dev'));

//initialization of session middleware
app.use(session({
  name : 'sessionCookie',
  secret : 'sessionSecretKey',
  resave : true,
  httpOnly : true,
  saveUninitialized: true,
  store : new mongoStore({mongooseConnection : mongoose.connection}),
  cookie : { maxAge : 60*60*1000 }
}));

//setting public folder as static.
app.use(express.static(path.resolve(__dirname,'./public')));

//setting views folder and using ejs engine for rendering.
app.set('views', path.resolve(__dirname,'./app/views'));
app.set('view engine', 'ejs');

//connecting with database.
var dbPath = "mongodb://localhost/ecomDB";
mongoose.connect(dbPath);
mongoose.connection.once('open',function(){
  console.log("Database Connection Established.");
});

//parsers for accepting inputs.
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

//http method override with post having 'put'.
//app.use(methodOverride('_method'));
app.use(methodOverride(function(req,res){
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    //look in urlencoded post bodies and delete it.
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//including models files.
fs.readdirSync("./app/models").forEach(function(file){
  if(file.indexOf(".js")){
    require("./app/models/"+file);
  }
});

//including controllers files.
fs.readdirSync("./app/controllers").forEach(function(file){
  if(file.indexOf(".js")){
    var route = require("./app/controllers/"+file);
    //calling controllers function and passing app instance.
    route.controller(app);
  }
});

//returning 404 status.
app.use(function(req,res){
  console.log("Page Not Found.");
  res.status(404).render('message',
                          {
                            title:"404",
                            msg:"Page Not Found.",
                            status:404,
                            error:"",
                            admin:req.session.admin
                          });
});

//app level middleware for setting logged in admin.
//app.use(auth.setLoggedInAdmin(req,res,next));
var adminModel = mongoose.model('Admin');

app.use(function(req,res,next){

	if(req.session && req.session.admin){
		adminModel.findOne({'email':req.session.admin.email},function(err,admin){

			if(admin){
				req.admin = admin;
				delete req.admin.password;
				req.session.admin = admin;
        delete req.session.admin.password;
				next();
			}

		});
	}
	else{
		next();
	}

});//end of setLoggedInAdmin.

//listening app at port 9000.
app.listen(9000,function(){
  console.log("Ecom App started at port : 9000.");
});
