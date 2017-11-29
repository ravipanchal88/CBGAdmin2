var express = require('express');
var router = express.Router();

/* GET for unauthorized users  */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    console.log(res.user);
    // console.log('ravi');
    if (res.user ='undefined'){
      console.log('User not defined');
      res.redirect('user/login');
      console.log('rrrr');
    }
    else  
     res.render('/',{ title :' express'});

});

//Get for Home Page 
router.get('/index', function(req, res, next) {
    console.log(res.user);
    res.render('index',{ title :' express'});

});


// router.get('/index', function(req, res, next) {
//   //res.render('index', { title: 'Express' });
//     console.log(res.user);
//     // console.log('ravi');
//     if (res.user ='undefined'){
//       console.log('User not defined');
//       res.redirect('user/login');
//       console.log('rrrr');
//     }
//     else  
//      res.render('/',{ title :' express'});

// });


module.exports = router;
