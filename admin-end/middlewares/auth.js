//including dependencies.
var mongoose = require('mongoose');

//router level middleware for checking login.
module.exports.checkLogin = function(req,res,next){

	if(!req.admin && !req.session.admin){
		res.redirect('/admin/login');
	}
	else{
		next();
	}

}//end checkLogin.
