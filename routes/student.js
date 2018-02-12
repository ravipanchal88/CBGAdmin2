var express  = require('express');
var paginate = require('express-paginate');
var multer   = require('multer');
var sharp    = require('sharp');
var models   = require('../models/index');
var Student  = models.student;
var Donor    = models.donor;
var Sponsorship = models.sponsorship;
var router   = express.Router();
var uploadHandler = multer({dest: 'public/images/studentimages'});

/* GET for unauthorized users  */



//Get for Home Page 

router.get('/index', function(req, res) {
	const page = req.query.page || 1;
	const itemCount = 11;
	const pageCount = Math.ceil(itemCount / req.query.limit);
	console.log("pageCount:"+ pageCount);
	Student.findAll({
		limit:15,
		offset:(((page)-1)*15)
	}).then(function(result) {
		// console.log(result);
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
router.post('/addstudent',uploadHandler.single('image'), function(request, response) {
	console.log("In Add Student POST Method");
	 console.log(Student);
	 console.log(request.body.firstname);
	// console.log(request.body.gender);
	console.log(request.file);
	console.log(request.file.filename);
	Student.create({
		cbg_id: request.body.cbg_id,
		standard: request.body.standard,
		division: request.body.division,
		aadharnbr: '123456',
		lastname: request.body.lastname,
		firstname: request.body.firstname,
		dob: request.body.dob,
		gender: request.body.gender,
		parentname: request.body.parentname,
		guardian_occupation: request.body.guardian_occupation,
		income:request.body.income,
		membersinfamily: request.body.membersinfamily,
		housetype:request.body.housetype,
		address: request.body.address,
		village: request.body.village,
		taluka: request.body.taluka,
		district: request.body.district,
		pincode: request.body.pincode,
		mobile_nbr: request.body.mobile_nbr,
		interest: request.body.interest,
		ambition: request.body.ambition,
		referredby: request.body.referredby,
		examination_marks: request.body.examination_marks,
		financialposition: request.body.financialposition,
		studycommitment: request.body.studycommitment,
		activity: request.body.activity,
		total:request.body.total,
		comment: request.body.comment,
		imageFilename: (request.file && request.file.filename),
		IsSponsored: false
	}).then(function(student) {
		console.log("Student Added");
		sharp(request.file.path)
		.resize(250,250)
		.withoutEnlargement()
		.toFile(`${request.file.path}-thumbnail`, function() {
			response.redirect('/student/index');
		})
		//response.redirect(post.url);
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


//Get Request  for sponsor Student
router.get('/sponsorstudent/:id', function(request, response, next) {
    console.log("On  sponsor student method");
	Student.findById(request.params.id).then(function(student){
		if (student)
	 		{
	 			Donor.findAll().then(function(donor){
	 				//console.log(donor);
	 				response.render('student/sponsorstudent', {
	 					student: student,
	 					donors: donor
	 				})
	 			})
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
			cbg_id: request.body.cbg_id,
			standard: request.body.standard,
			division: request.body.division,
			aadharnbr: '123456',
			lastname: request.body.lastname,
			firstname: request.body.firstname,
			dob: request.body.dob,
			gender: request.body.gender,
			parentname: request.body.parentname,
			guardian_occupation: request.body.guardian_occupation,
			income:request.body.income,
			membersinfamily: request.body.membersinfamily,
			housetype:request.body.housetype,
			address: request.body.address,
			village: request.body.village,
			taluka: request.body.taluka,
			district: request.body.district,
			pincode: request.body.pincode,
			mobile_nbr: request.body.mobile_nbr,
			interest: request.body.interest,
			ambition: request.body.ambition,
			referredby: request.body.referredby,
			examination_marks: request.body.examination_marks,
			financialposition: request.body.financialposition,
			studycommitment: request.body.studycommitment,
			activity: request.body.activity,
			total:request.body.total,
			comment: request.body.comment
		}
	 ).then(function(student) {
	 	console.log('i like black panties');
	 	console.log(student);
	 	response.redirect('/student/index');
		}).catch(function(error) {
			//console.log(student);
			response.render('student/editstudent', {
				 student: student
			});
		});
	});
});

//Post Request for Sponsoring Student '/:id/sponsor'  `/student/sponsorstudent/${student.id}
router.post('/sponsorstudent/:id', function(request, response) {
		Sponsorship.create ({
		student_id: request.params.id,
		donor_id :request.body.donor,
		amount: request.body.spr_amt,
		year: request.body.spr_year
	}).then(function(sponsorship){
		Student.findById(request.params.id).then(function(student) {
		student.update(  {
			IsSponsored: true
		})
	})
		response.redirect('/student/index');
	});
});

// Get Request for Search for Student
router.get('/search', function(req, res) {
	const page = req.query.page || 1;
	const itemCount = 11;
	const pageCount = Math.ceil(itemCount / req.query.limit);
	// console.log('this is page Count:'+ pageCount);
	// console.log("Search test");
	var query     = req.query.query;
	var condition = `%${query}%`;
	console.log("Search test2");
	Student.findAndCountAll({
		limit:10,
		offset:((page)-1)*10,
		where: {
			$or: {
				firstname: {
					$iLike: condition
				},
				lastname: {
					$iLike: condition
				}
			}
		}
	}).then(function(result) {
		res.render('student/searchstudent', {
			query: query,
			count: result.count,
			students: result.rows,
			pageCount,
			itemCount,
			pages: paginate.getArrayPages(req)(5,pageCount,req.query.page)
		});
	});
});

module.exports = router;
