var express = require('express');
var router = express.Router();



router.get('/home', function(req, res, next){
  res.render('home', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});



router.get('/item', function(req, res, next) {
  res.render('item');
});

router.get('/enquiry', function(req, res, next) {
  res.render('inquiry');
});

router.get('/viewenquiry', function(req, res, next) {
  res.render('viewenquiry');
});


router.get('/viewitem', function(req, res, next) {
  res.render('viewitem');
});
router.get('/home', function(req, res, next) {
  res.render('home');
});
router.get('/nav', function(req, res, next) {
  res.render('navbar');
});
router.get('/admindashboard', function(req, res, next) {
  res.render('admindashboard');
});
router.get('/adminnav', function(req, res, next) {
  res.render('adminnav');
});
router.get('/adminprofile', function(req, res, next) {
  res.render('adminprofile');
});
router.get('/newsadd', function(req, res, next) {
  res.render('newsadd');
});
router.get('/newsview', function(req, res, next) {
  res.render('newsview');
});
router.get('/rulesadd', function(req, res, next) {
  res.render('rulesadd');
});
router.get('/userprofile', function(req, res, next) {
  res.render('userprofile');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
module.exports = router;
