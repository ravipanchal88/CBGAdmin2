var express = require('express');
var models  = require('../models/index');
var Student = models.student;
var router = express.Router();

/* GET for unauthorized users  */


//Get for Home Page 

// router.get('/index', function(req, res, next) {
//     console.log("on student HOME page");
//     res.render('student/index',{ title :' express student page'});

// });

router.get('/index', function(req, res) {
	Student.findAll().then(function(result) {
		res.render('student/index', {
			students: result
		});
	});
});


//Get for Add Student
router.get('/addstudent', function(req, res, next) {
    console.log("on student page");
    res.render('student/addstudent',{ title :' express student page'});

});



//Add Student Data
router.post('/addstudent', function(request, response) {
	console.log("In Add Student POST Method");
	console.log(Student);
	console.log(request.body.firstname);
	console.log(request.body.gender);
	Student.create({
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		dob: request.body.dob,
		parentname: request.body.parentname,
		address: request.body.address,
		village: request.body.village,
		gender: request.body.gender,
		interest: request.body.interest,
		aadharnbr: request.body.aadharnbr,
		activity: request.body.activity,
		financialposition: request.body.financialposition,
		studycommitment: 'commited',
		comment: request.body.comment,
		income:request.body.income,
		housetype:request.body.housetype,
		total:request.body.total
		// firstname: 'ravi',
		// lastname: 'panchal',
		// dob: '09/13/1980',
		// parentname: 'sureshbhai',
		// address: '777 Hartley dr.,',
		// village: 'Ahmedabad',
		
		// interest: 'request.body.interest',
		// aadharnbr: 'request.body.aadharnbr',
		// activity: 'request.body.activity',
		// financialposition: 'request.body.financialposition',
		// studycommitment: 'request.body.studycommitment',
		// comment: 'request.body.comment',
		// income:'request.body.income',
		// housetype:'request.body.housetype',
		// total:'request.body.total'
	}).then(function(student) {
		console.log("Student Added");
		response.redirect(post.url);
	}).catch(function(error) {
		console.log('NOTE: Student was not added');
		response.render('student/addstudent', {
			student: request.body,
			errors:  error.errors
		})
	})	
});


module.exports = router;
