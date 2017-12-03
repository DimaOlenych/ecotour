var express = require('express');
var router = express.Router();
var Tour = require('../models/tour');
var Page = require('../models/page');
var List = require('../models/list');
var Currency = require('../models/currency');
var Country = require('../models/country');

const nodemailer = require('nodemailer');
//const account = require('../config/account')
const config = require('config');
//...
const account = config.get('application.gmail');


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
    res.render('contact', {
        title: 'Контакти'
    });
});

router.post("/contact", function(req, res) {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.message);
    if (req.body.human === "5") {
        //-------------------------------------------------------------------------------------------        
        console.log(account);
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Eco Tour Company" <region.it.mailer@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Message from Eco Tour', // Subject line
            text: "Дякуюэмо за заявку! Менеджер зв'яжеться найближчим часом", // plain text body
            html: "<b>Дякуюэмо за заявку!</b> Менеджер зв'яжеться найближчим часом" // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }

            res.render('mail-ok', {
                title: 'Контакти',
                messageId: info.messageId,
                previewURL: "Лист відправлено успішно"
            });
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

router.get("/list", function(req, res) {
    List.find({}, function(err, lists) {
        if (err) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        }
        if (lists == null) {
            lists = {
                company: "Roshen",
                representative: "І.І. Молочний",
                adress: "Кам-Под, Пушкіньска 43",
                valid: "Червень 2018"
            };
        }
        res.render("list", {
            title: "Список",
            lists: lists,
            scripts: [{
                src: "/javascripts/list.js"
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
            console.log(err);
        } else
            Tour.insertMany(tours, function(err, docs) {
                if (err) {
                    console.log(err);
                } else
                    console.log("Tours created successully!")
            });
    });

    var lists = [{
            company: "Roshen",
            representative: "І.І. Молочний",
            adress: "Кам-Под, Пушкіньска 43",
            valid: "Червень 2018"
        },
        {
            company: "Nescafe",
            representative: "Д.Б. Кавовар",
            adress: "Кам-Под, Тарасова 15",
            valid: "Серпень 2020"
        },
        {
            company: "Пчілка",
            representative: "О.О. Медовик",
            adress: "Кам-Под, Центральна 8",
            valid: "Травень 2024"
        },
        {
            company: "ABK",
            representative: "В.І Шоколадний",
            adress: "Кам-Под, Лесі Українки 14",
            valid: "Листопад 2019"
        }
    ];

    List.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else
            List.insertMany(lists, function(err, docs2) {
                if (err) {
                    console.log(err);
                } else
                    console.log("It's OK!")
            });
    });
    var countrys = [{
            country: "Єгипет",
            capital: "Каір",
            content: ""
        },
        {
            country: "Турція",
            capital: "Анкара",
            content: ""
        },
        {
            country: "Тайланд",
            capital: "Бангкок",
            content: ""
        },
        {
            country: "Україна",
            capital: "Київ",
            content: ""
        },
        {
            country: "Чехія",
            capital: "Прага",
            content: ""
        },
        {
            country: "Угорщина",
            capital: "Будапешт",
            content: ""
        },
        {
            country: "Польща",
            capital: "Варшава",
            content: ""
        },
    ];

    Country.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else
            Country.insertMany(countrys, function(err, docs) {
                if (err) {
                    console.log(err);
                } else
                    console.log('Country OK!');
            });
    });

    page = new Page({
        name: "about",
        main_text: "Empty page"
    });
    page.save(function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log("Yes");
        }
    });

    res.status(200).json({
        message: "Okey",
    });
});


router.get('/giftcards', function(req, res, next) {
    res.render('giftcards');
});

router.get('/tours_in_sell', function(req, res, next) {
    res.render('tours_in_sell', {
        styles: [{ href: "/stylesheets/tours.css" }]
    });
});

router.get('/virtualreality', function(req, res, next) {
    res.render('virtualreality');
});

router.get('/autobus', function(req, res, next) {
    res.render('autobus');
});

router.get('/employmentAbroad', function(req, res, next) {
    res.render('employmentAbroad');
});

module.exports = router;