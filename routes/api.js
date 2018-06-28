var db = require('../database');

module.exports = function (app) {
    app.post('/api', function (req, res) {
        res.json({hello: "available endpoints: /getCategories and /getProducts?name=xxx&category=1"});
    });

    app.get('/api/getCategories', function (req, res) {
        db.getCategories().then(categories => {
            res.json(categories);
        });

    });

    app.get('/api/getProducts', function (req, res) {
        var cat = req.query.category;
        var name = req.query.name;
        console.log(cat);
        console.log(name);
        if (name === undefined) {
            name = "";
        }
        if (cat===undefined){
            db.getProductsByName(name).then(categories => {
                res.json(categories);
            });
        } else {
            db.getProductsByCategoryAndName(cat,name).then(categories => {
                res.json(categories);
            });
        }

    });

}