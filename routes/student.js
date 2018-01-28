var express  = require('express');
var paginate = require('express-paginate');
var multer   = require('multer');
var sharp    = require('sharp');
var models   = require('../models/index');
var Student  = models.student;
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
		offset:((page)-1)*15
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
router.post('/addstudent',uploadHandler.single('image'), function(request, response) {
	console.log("In Add Student POST Method");
	 console.log(Student);
	 console.log(request.body.firstname);
	// console.log(request.body.gender);
	console.log(request.file);
	console.log(request.file.filename);
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
		total:request.body.total,
		imageFilename: (request.file && request.file.filename)
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


// // Create.
// router.post('/', uploadHandler.single('image'), function(request, response) {
// 	Imagepost.create({
// 		title:         request.body.title,
// 		body:          request.body.body,
		
// 		imageFilename: (request.file && request.file.filename)
// 	}).then(function(imagepost) {
// 		console.log("inPICloop");
// 		sharp(request.file.path)
// 		.resize(490,490)
// 		.withoutEnlargement()
// 		.toFile(`${request.file.path}-thumbnail`, function() {
// 			response.redirect('/imagepost');
// 		});
// 	}).catch(function(error) {
// 		response.render('imagepost/new', {
// 			imagepost:   request.body,
// 			errors: error.errors
// 		});
// 	});
// });

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

// Get Request for Search for Student
router.get('/search', function(req, res) {
	const page = req.query.page || 1;
	const itemCount = 11;
	const pageCount = Math.ceil(itemCount / req.query.limit);
	console.log('this is page Count:'+ pageCount);
	console.log("Search test");
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
