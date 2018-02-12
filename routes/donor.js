var express = require('express');
var paginate = require('express-paginate');
var models  = require('../models/index');
var Donor = models.donor;
var Sponsorship = models.sponsorship;
var Student = models.student;

var router = express.Router();

/* GET for unauthorized users  */

//Get for Home Page 
router.get('/index', function(req, res) {
	const page = req.query.page || 1;
	const itemCount = 11;
	const pageCount = Math.ceil(itemCount / req.query.limit);
	console.log('this is page Count:'+ pageCount);
	Donor.findAll({
		limit:10,
		offset:((page)-1)*10
	}).then(function(result) {
		res.render('donor/index', {
			donors: result,
			pageCount,
			itemCount,
			pages: paginate.getArrayPages(req)(5,pageCount,req.query.page)
		});
	});
});


//Get Request  for Add Donors
router.get('/adddonor', function(req, res, next) {
    console.log("on donor page");
    res.render('donor/adddonor',{ title :'CBG Admin'});
});

//Post Request for Add Donor
router.post('/adddonor', function(request, response) {
	console.log("In add Donor POST Method");
	console.log(Donor);
	console.log(request.body.address1);
	// console.log(request.body.gender);
	Donor.create({
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		address1: request.body.address1,
		address2: request.body.address2,
		city: request.body.city,
		state: request.body.state,
		zip: request.body.zip,
		email: request.body.email,
		phone: request.body.phone,
		comment: request.body.comment
	}).then(function(donor) {
		console.log("donor was Added");
		response.redirect(post.url);
	}).catch(function(error) {
		console.log('NOTE: Donor was not added');
		response.render('donor/adddonor', {
			donor: request.body,
			errors:  error.errors
		})
	})	
});


//Get Request  for Edit/Update Donor
router.get('/editdonor/:id', function(request, response, next) {
    console.log("On Donor EDIT page");
	Donor.findById(request.params.id).then(function(donor){
		if (donor)
	 		{	
	 			Sponsorship.findAll({
	 				attributes : ["student_id"] ,
	 				where: {
		 				donor_id: request.params.id
		 		 	}	
		 		}).then(function(result){
		 			var students = [];
		 			var columnData =[];
		 			for(var i = 0; i < result.length; i++) 
		 				{
		 					columnData[i] = result[i].dataValues;
		 					students[i] = columnData[i].student_id;
		 				}	
		 			Student.findAll({
		 					 where: {
		 					 	id : students
		 					}
		 			}).then(function(result1){
		 				//console.log(result1);
		 				response.render('donor/editdonor', {
		 					donor: donor,
		 					sponsored_students: result1
		 				})
		 			})
		 		})			
	 		}
		else
			response.redirect('/');
	}).catch(function(err) {
	 	response.redirect('/donor/index');
	 });
});


//Post Request for Edit/Update Donor 
router.post('/editdonor/:id', function(request, response) {
	Donor.findById(request.params.id).then(function(donor) {
		donor.update(  {
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		address1: request.body.address1,
		address2: request.body.address2,
		city: request.body.city,
		state: request.body.state,
		zip: request.body.zip,
		email: request.body.email,
		phone: request.body.phone,
		comment: request.body.comment
		}
	 ).then(function(donor) {
	 	console.log(donor);
	 	response.redirect('/donor/index');
		}).catch(function(error) {
			console.log(donor);
			response.render('donor/editdonor', {
				 donor:    donor
			});
		});
	});
});

// Get Request for Search for Donor
router.get('/search', function(req, res) {
	const page = req.query.page || 1;
	const itemCount = 11;
	const pageCount = Math.ceil(itemCount / req.query.limit);
	console.log('this is page Count:'+ pageCount);
	console.log("Search test");
	var query     = req.query.query;
	var condition = `%${query}%`;
	console.log("Search test2");
	Donor.findAndCountAll({
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
		res.render('donor/searchdonor', {
			query: query,
			count: result.count,
			donors: result.rows,
			pageCount,
			itemCount,
			pages: paginate.getArrayPages(req)(5,pageCount,req.query.page)
		});
	});
});

module.exports = router;
