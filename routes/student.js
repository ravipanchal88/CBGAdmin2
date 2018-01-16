var express = require('express');
var paginate = require('express-paginate');
var models  = require('../models/index');
var Student = models.student;
var router = express.Router();

/* GET for unauthorized users  */

//Get for Home Page 

router.get('/index', function(req, res) {
	const page = req.query.page || 1;
	const itemCount = 11;
	const pageCount = Math.ceil(itemCount / req.query.limit);
	console.log('this is page Count:'+ pageCount);

	Student.findAll({
		limit:10,
		offset:((page)-1)*10
		
	}).then(function(result) {
		res.render('student/index', {
			students: result,
			pageCount,
			itemCount,
			pages: paginate.getArrayPages(req)(5,pageCount,req.query.page)
		});
	});
});


//Get Request  for Add Student
router.get('/addstudent', function(req, res, next) {
    console.log("on student page");
    res.render('student/addstudent',{ title :' express student page'});
});

//Post Request for Add Student Data
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


//Get Request  for Edit/Update Student
router.get('/editstudent/:id', function(request, response, next) {
    console.log("On students EDIT page");
	Student.findById(request.params.id).then(function(student){
		if (student)
	 		{
	 			response.render('student/editstudent', {student: student})
	 			console.log(student);
	 		}
		else
			response.redirect('/');
	}).catch(function(err) {
	 	response.redirect('/student/index');
	 });
});


//Post Request for Edit/Update Student '/:id/edit'
router.post('/editstudent/:id', function(request, response) {
	Student.findById(request.params.id).then(function(student) {
		student.update(  {
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
		}
	 ).then(function(student) {
	 	console.log(student);
	 	response.redirect('/student/index');
		}).catch(function(error) {
			console.log(student);
			response.render('student/editstudent', {
				 student:    student
			});
		});
	});
});

module.exports = router;
