var express  = require('express');
var passport = require('passport');
var local    = require('passport-local');
var bcrypt   = require('bcrypt');
var models   = require('../models/index');
var flash = require('connect-flash');
//var models   = require('../models/users');
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
	        		return(done(null, false, {message: 'A user with that email does not exist.'}));
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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  });
});

// Sign up.
router.get('/signup', function(request, response) {
	response.render('user/signup', {
		
	})
});

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

// Log in.
router.get('/login', function(request, response) {
	console.log("Login get function");
	response.render('user/login')
});

//Post Request for Login 1
// router.post('/login', passport.authenticate('local'),function(request, response) {
// 	console.log("Login Loop 1");
// 	response.redirect('/index');
// });

//Post Request for Login 2
router.post('/login', passport.authenticate('local',
	{ successRedirect: '/index',
      failureRedirect: ('../user/login'),
      failureMessage: 'Invalid username or password.'})
);


//Post Request for Login 3
// router.post('/login', function(req,res,next){
// 	console.log('In LOGIN POST LOOP');
// 	passport.authenticate('local',function(err,user,info){
// 		if(err){
// 			return next(err)}
// 		if(!user){
// 			return res.render('../user/login', { message : info.message})
// 		}	
// 		else {
// 			return res.redirect('index/');
// 		}
// 		console.log(result)
// 	});
// });



// Log out.
router.get('/logout', function(request, response) {
	request.logout();
	response.redirect('/user/login');
});




module.exports = router;
