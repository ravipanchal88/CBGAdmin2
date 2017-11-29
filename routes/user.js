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
	new local.Strategy(
		function(email, password, done) {
	    User.findOne({
				where: {
					email: email
				}
			}).then(function(user) {
	      if (!user) {
	        return(done(null, false, {message: 'A user with that email does not exist.'}));
	    }
	      else {
				bcrypt.compare(password, user.password, function(error, result) {
				if (result)
				    return(done(null, user));
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
		console.log(User);
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

router.post('/login', passport.authenticate('local'),function(request, response) {
	console.log("Login Loop 1");
	response.redirect('/index');
});


// router.post('/login', passport.authenticate('local',
// 	{ successRedirect: '/index',
//       failureRedirect: 'user/login'
//       failureFlash: 'Invalid username or password.'})
// );



// Log out.
router.get('/logout', function(request, response) {
	request.logout();
	response.redirect('/user/login');
});




module.exports = router;
