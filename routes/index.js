var express = require('express');
var router = express.Router();

/* GET for unauthorized users  */
router.get('/', function(req, res, next) {
    console.log(res.user);
    if (res.user ='undefined'){
      //console.log('User not defined');
      res.redirect('user/login');
    }
    else  
     res.render('/',{ title :' express'});

});

//Get for Home Page 
router.get('/index', function(req, res, next) {
    console.log(res.user);
    res.render('index',{ title :' express'});

});

module.exports = router;
