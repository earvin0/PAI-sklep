var express = require('express');
var router = express.Router();
var db = require('../database');


/* GET home page. */
router.get('/', function(req, res, next) {
    db.getCategories().then(categories => {

        if(req.query.category!==undefined){
            if(req.query.searchQuery!==undefined){
                db.getProductsByCategoryAndName(req.query.category,req.query.searchQuery).then(products => {
                    res.render('index', {category: req.query.category, categories: categories, products: products})
                });
            } else {
                db.getProductsByCategory(req.query.category).then(products => {
                    res.render('index', {category: req.query.category, categories: categories, products: products})
                });
            }
        } else {
            if(req.query.searchQuery!==undefined){
                db.getProductsByName(req.query.searchQuery).then(products => {
                    res.render('index', {category: req.query.category, categories: categories, products: products})
                });
            } else {
                db.getProducts().then(products => {
                    res.render('index', {category: req.query.category, categories: categories, products: products})
                });
            }
        }
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
    db.getCartProductsForUser(1).then(products => {
        res.render('cart',{items: products});
    });
    ;


});

router.post('/checkout', function (req,res,next) {
    console.log(req.body.products);
    console.log(req.body.quantities);
   res.render('checkout', {orderID: "1232141421"});
});


router.post('/remove', function (req,res,next) {
    console.log(req.body.productID);

    //remove from users cart
    res.redirect("/cart")
});

module.exports = router;
