var express = require('express');
var models   = require('../models/index');
var Student  = models.student;
var Donor    = models.donor;
var Sponsorship = models.sponsorship;
var router = express.Router();

/* GET for unauthorized users  */
router.get('/', function(req, res, next) {
    console.log(res.user);
    if (res.user ='undefined'){
      //console.log('User not defined');
      res.redirect('user/login');
    }
    else  
     res.render('/',{ title :'CBG Admin'});

});

//Get for Home Page 
router.get('/index', function(req, res, next) {
   	Student.findAndCountAll({
   		where: {
				IsSponsored: true
				}
	}).then(function(result){
		Student.findAndCountAll({
   		where: {
				IsSponsored: false
				}
		}).then(function(result1) {
			Donor.findAndCountAll({
				}).then(function(result2){
					res.render('index', {
					students: result,
					stud_count: result.count, //Count for all sponsored students
					unspon_count: result1.count, // Count for unsponsored Students
					donor_count: result2.count // Count for donor
				})
			})	
		})
	});
});

module.exports = router;
