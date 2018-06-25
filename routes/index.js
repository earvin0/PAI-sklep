var express = require('express');
var router = express.Router();
var db = require('../database');


/* GET home page. */
router.get('/', function(req, res, next) {
    db.getCategories().then(categories => {
        db.getProducts().then(products => {
            res.render('index', {category: req.query.category, categories: categories, products: products})
        })
    });

  // res.render('index', { category: req.query.category,categories: ["Laptopy","Laptopy2","Laptopy3"],products: [{name:"Laptop",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop2",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop3",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop2",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop3",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop2",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop3",description:"mozna sie nim wytrzec ale tani"}] });
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/loginUser',function(req,res,next){
    //zaloguj i redirect!
    res.redirect('/');
});

router.post('/registerUser',function(req,res,next){
    //zarejestruj w serwerze i zaloguj!
    res.redirect('/');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/cart', function(req, res, next) {
    //get cart
    const data = [{name: "lama", price: "1.00"},{name: "kuna", price: "2.00"},{name: "los", price: "13.00"},{name: "jezozwierz", price: "5.00"}];
    res.render('cart',{items: data});
});

router.post('/checkout', function (req,res,next) {
   res.render('checkout', {orderID: "1232141421"});
});

module.exports = router;
