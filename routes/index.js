var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Головна сторінка' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Про фірму' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Контакти' });
});

router.post("/contact", function(req, res) {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.message);
    if (req.body.human === "5") {
        res.render("contact", { title: 'Контакти' });
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
    var scripts = [{src:"/javascripts/prices.js"}];
    res.render("prices", { title: "Ціни на тури", tours: tours, scripts: scripts });
});
module.exports = router;