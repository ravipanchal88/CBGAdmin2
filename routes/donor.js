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
	var pageCount;
	Donor.findAndCountAll().then(function(result1){
		console.log(result1);
		pageCount = Math.ceil(result1.count / req.query.limit);
		console.log("pageCount:"+ pageCount);
	}).then(function(result1){
	Donor.findAll({
		limit:10,
		offset:((page)-1)*10
	}).then(function(result) {
		res.render('donor/index', {
			donors: result,
			pageCount,
			pages: paginate.getArrayPages(req)(5,pageCount,req.query.page)
		});
	});
	});
});


//Get Request  for Add Donors
router.get('/adddonor', function(req, res, next) {
    console.log("on donor page");
    res.render('donor/adddonor', { 
    	donor: {}
	});
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
		comments: request.body.comments
	}).then(function(donor) {
		console.log("donor was Added");
		response.redirect('/donor/index');
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
	 				attributes : ["student_id","year"] ,
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
	 	response.render('/donor/editdonor/:id',{
	 		donor:donor,
	 		errors :error.errors

	 	});
	 });
});


//Post Request for Edit/Update Donor 
router.post('/editdonor/:id', function(request, response) {
	Donor.findById(request.params.id).then(function(donor) {
		donor.update({
			firstname: request.body.firstname,
			lastname: request.body.lastname,
			address1: request.body.address1,
			address2: request.body.address2,
			city: request.body.city,
			state: request.body.state,
			zip: request.body.zip,
			email: request.body.email,
			phone: request.body.phone,
			comments: request.body.comments
			}).then(function(donor) {
		 		console.log(donor);
			 	//******This is where I left
			 	response.redirect('/donor/index')
		 		
			}).catch(function(error) {
				console.log("BLACK PANTIES" +donor);
				response.render('donor/editdonor', {
			 	donor:donor,
	 			errors :error.errors,
			 	sponsored_students: {}
		 	});
		});	
	});
})
	


// Get Request for Search for Donor
router.get('/search', function(req, res) {
	//const page = req.query.page || 1;
	//const itemCount = 11;
	//const pageCount = Math.ceil(itemCount / req.query.limit);
	//console.log('this is page Count:'+ pageCount);
	const page = req.query.page || 1;
	var pageCount;
	//console.log("Search test");
	var query     = req.query.query;
	var condition = `%${query}%`;
	Donor.findAndCountAll().then(function(result1){
		console.log(result1);
		pageCount = Math.ceil(result1.count / req.query.limit);
		console.log("pageCount:"+ pageCount);
	}).then(function(result1){
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
				pages: paginate.getArrayPages(req)(5,pageCount,req.query.page)
			});
		});
	});	
});

module.exports = router;
