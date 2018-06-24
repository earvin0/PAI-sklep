var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.searchQuery);
  console.log(req.query.category);
  res.render('index', { category: req.query.category,categories: ["Laptopy","Laptopy2","Laptopy3"],products: [{name:"Laptop",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop2",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop3",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop2",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop3",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop2",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop3",description:"mozna sie nim wytrzec ale tani"}] });
});

module.exports = router;
