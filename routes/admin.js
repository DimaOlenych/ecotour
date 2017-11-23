var express = require('express');
var router = express.Router();
var Page = require('../models/page');
var Tour = require('../models/tour');
var ObjectId = require('mongodb').ObjectID;

<<<<<<< HEAD
function renderError(err) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
}

router.get('/', function (req, res) {
    res.render('admin/index');
=======
router.get('/', function(req, res) {
    res.render('admin/index', { title: "Адміністрування" });
>>>>>>> 7906f53c4c5c9f563aef4d1b7b8b11b5fab7c224
});

router.get('/edit', function (req, res) {
    console.log("Step 1");
    Page.findOne({
        name: req.query.name
    }, function (err, page) {
        console.log("Step 2");
        if (err) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        } else {
            console.log("Step 3 ");
            if (page == null) {
                page = new Page({
                    name: req.query.name,
                    main_text: "Empty page"
                });
                page.save(function (err) {
                    if (err) {
                        console.log("Step 4");
                        res.locals.message = err.message;
                        res.locals.error = req.app.get('env') === 'development' ? err : {};
                        // render the error page
                        res.status(err.status || 500);
                        res.render('error');
                    } else {
                        console.log("Step 5b");
                        res.render('admin/edit', {
                            scripts: [{
                                    src: "/javascripts/ckeditor/ckeditor.js"
                                },
                                {
                                    src: "/javascripts/admin/edit.js"
                                }
                            ],
                            title: "Редагування сторінки",
                            hidden_id: page._id,
                            hidden_name: req.query.name,
                            main_text: page.main_text
                        });
                    }
                });
            } else {
                console.log("Step 5a");
                res.render('admin/edit', {
                    scripts: [{
                            src: "/javascripts/ckeditor/ckeditor.js"
                        },
                        {
                            src: "/javascripts/admin/edit.js"
                        }
                    ],
                    title: "Редагування сторінки " + req.query.name,
                    hidden_id: page._id,
                    hidden_name: req.query.name,
                    main_text: page.main_text
                });
            }
        }
    });
});

<<<<<<< HEAD
router.post('/edit', function (req, res) {
    console.log(req.body.hidden_id);
=======
router.post('/edit', function(req, res) {
>>>>>>> 7906f53c4c5c9f563aef4d1b7b8b11b5fab7c224
    Page.findByIdAndUpdate(req.body.hidden_id, {
            $set: {
                main_text: req.body.editor1
            }
        }, {
            new: true
        },
        function (err, otherPage) {
            if (err) {
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};
                // render the error page
                res.status(err.status || 500);
                res.render('error');
            } else
                res.redirect('/' + req.body.hidden_name);
        });
});


<<<<<<< HEAD
router.get('/tours', function (req, res) {
    Tour.find()
        .then(tours => res.render('admin/tours', {
            tours: tours
        }))
        .catch( err => renderError(err));
})
=======
router.get('/tours', function(req, res) {
    // отримати з БД дані про тури
    Tour.find({}, function(err, tours) {
        if (err) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        } else {
            res.render('admin/tours', {
                tours: tours,
                styles: styles = [{
                    href: "/stylesheets/tour.css"
                }],
                scripts: [{
                        src: "/javascripts/admin/tours.js"
                    },
                    {
                        src: "http://tablesorter.ru/jquery.tablesorter.min.js",
                    }
                ],
                title: "Адміністрування турів"
            });
        }
    });
});
>>>>>>> 7906f53c4c5c9f563aef4d1b7b8b11b5fab7c224

router.get('/tour', function (req, res) {
    if (req.query.action == "edit") {
<<<<<<< HEAD
        Tour.findById(req.query.id)
            .then(tour => res.render('admin/tour', {
                tour: tour
            }))
            .catch( err=> renderError(err));
=======
        Tour.findById(req.query.id, function(err, tour) {
            if (err) {
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};
                // render the error page
                res.status(err.status || 500);
                res.render('error');
            } else {
                res.render('admin/tour', { tour: tour, title: "Редагування туру" });
            }
        })
>>>>>>> 7906f53c4c5c9f563aef4d1b7b8b11b5fab7c224
    }
    if (req.query.action == "delete") {
        Tour.remove({ _id: req.query.id }, function(err, result) {
            if (err) {
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};
                // render the error page
                res.status(err.status || 500);
                res.render('error');
            } else {
                res.redirect("tours");
            }
        });
    }
    if (req.query.action == "new") {
        var newTourId = new ObjectId();
        var tour = { _id: newTourId };
        res.render('admin/tour', { tour: tour, title: "Створення туру" });
    }
});

router.post('/tour', function(req, res) {
    Tour.findByIdAndUpdate(req.body.hid, {
            $set: {
                _id: req.body.hid,
                country_en: req.body.country_en,
                country_uk: req.body.country_uk,
                days: req.body.days,
                price: req.body.price
            }
        }, {
            new: true
        },
        function(err, otherTour) {
            if (err) {
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};
                // render the error page
                res.status(err.status || 500);
                res.render('error');
            } else {
                Tour.findById(req.body.hid, function(err, tour) {
                    if (err) {
                        res.locals.message = err.message;
                        res.locals.error = req.app.get('env') === 'development' ? err : {};
                        // render the error page
                        res.status(err.status || 500);
                        res.render('error');
                    } else {
                        if (tour == null) {
                            tour = new Tour({
                                _id: req.body.hid,
                                country_en: req.body.country_en,
                                country_uk: req.body.country_uk,
                                days: req.body.days,
                                price: req.body.price
                            });
                            tour.save(function(err) {
                                if (err) {
                                    res.locals.message = err.message;
                                    res.locals.error = req.app.get('env') === 'development' ? err : {};
                                    // render the error page
                                    res.status(err.status || 500);
                                    res.render('error');
                                } else {
                                    // I don't know!!!
                                }
                            });
                        }
                    }
                });
                res.redirect('tours');
            }
        });
});

module.exports = router;