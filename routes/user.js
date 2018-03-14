var express  = require('express');
var passport = require('passport');
var local    = require('passport-local');
var bcrypt   = require('bcrypt');
var models   = require('../models/index');
//var flash = require('connect-flash');
var flash = require('express-flash');
var nodemailer = require('nodemailer');
//var models   = require('../models/users');
var crypto = require('crypto');
var async = require('async');
var User     = models.user;
var router   = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/login', function(req, res, next) {
//   res.render('users/index');
// });

// Passport.
passport.use(
	new local.Strategy({
		username:'email',
		password:'password',
		session: false
	},
		function(email, password, done) {
			console.log('In passport use function');
	    	User.findOne({
				where: {
					email: email
				}
			}).then(function(user) {
	      			if (!user) {
	      			console.log('User Does Not Exist');
	      			//req.flash('error','User does not Exist');
	        		return(done(null, false, { }));
	    			}
	      			else {
	      				console.log('User Exist');
						bcrypt.compare(password, user.password, function(error, result) {
							if (result){
				    			return(done(null, user));
				    		}
							else
			        return(done(null, false, {message: 'Incorrect password.'}));
	        	});
			}
	    });
	  }
	)
);
//Passport Serialize user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
//passport Deserialize user 
passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  });
});

//Get Request for Sign up.
router.get('/signup', function(request, response) {
	response.render('user/signup', {
		
	})
});
//Post Request for Sign up.
router.post('/signup', function(request, response) {
	bcrypt.hash(request.body.password, 10, function(error, password) {
		console.log("I am here for Checking Signup Loop")
		//console.log(User);
		User.create({
			email:    request.body.email,
			password: password,
			name:     request.body.name
		}).then(function(user) {
			request.login(user, function(error) {
				response.render('user/login');
			});
		}).catch(function(error) {
			response.render('user/signup', {
				user:   request.body,
				errors: error.errors
			});
		});
	});
});
//Get Request for Forgot Password
router.get('/forgot', function(request, response) {
	response.render('user/forgot', {
		
	})
});
//Post request for Forgot Password 
router.post('/forgotpwd',function(req,res,next){
//
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
    	//console.log(token);
    	var resettoken = token;
    	User.findOne({ 
      		where :{
      			email: req.body.email
      		}
    	}).then(function(user,token,error) {
        	if (!user) {
        		//const flashMessages = res.locals.getMessages();
        		//console.log(flashMessages);
        		//console.log('Error :No Account with that Email Exist');      	
          		req.flash('error', 'Oops, We could not find the Email Address');
          		return res.render('user/forgot',{});
        	}
			else {
				console.log('Reset Tokens : ' + resettoken);
    			user.update({
					resetPasswordToken : resettoken ,
					resetPasswordExpires : (Date.now() + 3600000) // 1 hour
				},{where :req.body.user}).then(function(user,token,done) {
					console.log('In the nodemailer function ');
					console.log('User email :' +user.email);
					console.log('Reset Token:' +resettoken);
					var useremail = user.email;
					nodemailer.createTestAccount((err, account) => {
				    // create reusable transporter object using the default SMTP transport
				   		var transporter = nodemailer.createTransport({
		 				service: 'gmail',
						 auth: {
						        user: 'pancha.ravi@gmail.com',
						        pass: 'ljlfleacdlhrfimv'//ljlfleacdlhrfimv
						    }
						});
				    // setup email data with unicode symbols
				    	const mailOptions = {
							  from: 'pancha.ravi@gmail.com', // sender address
							  to: useremail, // list of receivers
							  subject: 'CBG Admin - Password Reset', // Subject line
							  html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          							'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          							'http://' + req.headers.host + '/user/reset/' + resettoken + '\n\n' +
          							'If you did not request this, please ignore this email and your password will remain unchanged.\n'
							};
						console.log(mailOptions);	
				    // send mail with defined transport object
					    transporter.sendMail(mailOptions, (error, info) => {
					        if (error) {
					        	console.log('ERROR: MAIL WAS NOT SENT');
					            return console.log(error);
					        }
					    	});
						});
						console.log('Mail sent');
						res.redirect('/user/login');
					})	
			}
      	});
    	}
    ])
//		
});
//Get Request for Reset Password 
router.get('/reset/:token', function(req, res) {
	console.log(req.params.token);
	User.findOne({ 
      		where :{
      			resetPasswordToken: req.params.token,
      			resetPasswordExpires: { $gt: Date.now() }
      		}
    	}).then(function(user,err) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      console.log('Error :No EMAIL was found for user');
      //return res.redirect('/user/forgot');
    }
    res.render('user/reset', {});
  });
});
//******Post Request forget  passoword  Request
router.post('/reset/:token',function(req,res,next){
	//console.log(res.params);
	bcrypt.hash(req.body.password, 10, function(error, password) {
		console.log("In Password Reset POST method");
		//console.log(req);
		console.log(req.params);
		User.findOne({
			where: {
			resetPasswordToken: req.params.token
			}
		}).then(function (user){
			// If user was not found redirect to Forgot Page
			if (!user) {
          		req.flash('error', 'We could reset your password.Please request Password reset');
          		return res.redirect('/user/forgot');
        	}
        	//If User was found then
			else {
    			user.update({
    				password: password    ,     //update the Password
					resetPasswordToken : null,  //Reset to Null
					resetPasswordExpires : null // Reset to Null
					},{where :user.email
				}).then(function(user){
					console.log('In the Password change Email loop ');
					console.log('User email :' +user.email);
					//console.log('Reset Token:' +resettoken);
					var useremail = user.email;
					nodemailer.createTestAccount((err, account) => {
				    // create reusable transporter object using the default SMTP transport
				   		var transporter = nodemailer.createTransport({
		 				service: 'gmail',
						 auth: {
						        user: 'pancha.ravi@gmail.com',
						        pass: 'ljlfleacdlhrfimv'//ljlfleacdlhrfimv
						    }
						});
				    // setup email data with unicode symbols
				    	const mailOptions = {
							from: 'pancha.ravi@gmail.com', // sender address
							to: useremail, // list of receivers
							subject: 'Your password has been changed',
        					text: 'Hello,\n\n' +'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n' 
							};
						console.log(mailOptions);	
				    // send mail with defined transport object
					    transporter.sendMail(mailOptions, (error, info) => {
					        if (error) {
					        	console.log('ERROR: MAIL WAS NOT SENT');
					            return console.log(error);
					        }
					    	});
						});
						console.log('Mail sent');
						res.redirect('/user/login');
					})		
      		}
    	})
	})
});

//Get Request for Login.
router.get('/login', function(request, response) {
	console.log("Login get function");
	response.render('user/login')
});
//Post Request for Login
router.post('/login', passport.authenticate('local',
	{ successRedirect: '/index',
      failureRedirect: ('../user/login'),
      failureMessage: 'Invalid username or password.'})
);
// Log out.
router.get('/logout', function(request, response) {
	request.logout();
	response.redirect('/user/login');
});

module.exports = router;
