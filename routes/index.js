var express = require('express');
var router = express.Router();
var Tour = require('../models/tour');
var Page = require('../models/page');

/* GET home page. */
router.get('/', function(req, res, next) {
    Page.findOne({
        name: "home"
    }, function(err, page) {
        if (err) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        } else {
            var scripts = [{
                src: "/javascripts/home.js"
            }];
            if (page == null) {
                page = {
                    name: "home",
                    main_text: "<strong>Empty page or page not found</strong>"
                };
            }
            res.render('index', {
                title: 'Головна сторінка',
                main_text: page.main_text,
                scripts: scripts
            });
        }
    });
});

router.get('/home', function(req, res, next) {
    res.redirect('/');
});

router.get('/about', function(req, res, next) {
    Page.findOne({
        name: "about"
    }, function(err, page) {
        if (err) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        } else {
            var scripts = [{
                src: "/javascripts/about.js"
            }];
            if (page == null) {
                page = {
                    name: "about",
                    main_text: "<strong>Empty page or page not found</strong>"
                };
            }
            res.render('about', {
                title: 'Про фірму',
                hidden_id: page._id,
                main_text: page.main_text,
                scripts: scripts
            });
        }
    });
});

router.get('/contact', function(req, res, next) {
    var scripts = [{
        src: "/javascripts/contact.js"
    }];
    res.render('contact', {
        title: 'Контакти',
        scripts: scripts
    });
});

router.post("/contact", function(req, res) {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.message);
    if (req.body.human === "5") {
        res.render("contact", {
            title: 'Контакти'
        });
    } else {
        res.render("error", {
            title: 'Помилка',
            message: "Помилка",
            error: {
                stack: "Є підозра, що ви не людина"
            }
        });
    }
});

router.get("/prices", function(req, res) {
    Tour.find({}, function(err, tours) {
        if (err) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        }

        res.render("prices", {
            title: "Ціни на тури",
            tours: tours,
            scripts: [{
                src: "/javascripts/prices.js"
            }]
        });
    });
});

router.get("/setup-db", function(req, res) {
    var tours = [{
            country_en: "Egypt",
            country_uk: "Єгипет",
            days: 6,
            price: 12000
        },
        {
            country_en: "Greece",
            country_uk: "Греція",
            days: 8,
            price: 12000
        },
        {
            country_en: "Bulgaria",
            country_uk: "Болгарія",
            days: 10,
            price: 14000
        },
        {
            country_en: "Greece",
            country_uk: "Греція1",
            days: 9,
            price: 12000
        },
        {
            country_en: "Bulgaria",
            country_uk: "Болгарія1",
            days: 12,
            price: 14000
        }
    ];

    Tour.remove({}, function(err) {
        if (err) {
            console.log(err)
        }
        Tour.insertMany(tours, function(err, docs) {
            if (err) {
                console.log(err)
            }
            res.status(200).json({
                message: "Ok"
            });
        })
    });

    page = new Page({
        name: "about",
        main_text: "Empty page"
    });
    page.save(function(err) {
        if (err) {
            console.error(err)
        } else {
            console.log("Yes");
        }
    });
});

router.get('/giftcards', function(req, res, next) {
    res.render('/giftcards');
});

router.get('/tours_in_sell', function(req, res, next) {
    res.render('/tours_in_sell');
});

router.get('/virtualreality', function(req, res, next) {
    res.render('/virtualreality');
});

router.get('/autobus_tickets_online', function(req, res, next) {
    res.render('/autobus_tickets_online');
});

router.get('/employmentAbroad', function(req, res, next) {
    res.render('/employmentAbroad');
});

module.exports = router;