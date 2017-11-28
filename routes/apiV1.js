const express = require('express');
const router = express.Router();

const pagesController = require('../controllers/pagesController');
const toursController = require('../controllers/toursController');
const listsController = require('../controllers/listsController');
const currencyController = require('../controllers/currencyController');

// pages Routes
router.route('/pages')
    .get(pagesController.all)
    .post(pagesController.createPage);

router.route('/page/:pageId')
    .get(pagesController.read)
    .put(pagesController.update)
    .delete(pagesController.delete);

// tours Routes
router.route('/tours')
    .get(toursController.all)
    .post(toursController.createTour);

router.route('/tour/:tourId') // /tour/123456 ->req.params.tourId
    .get(toursController.read)
    .put(toursController.update)
    .delete(toursController.delete);

// currency Routes
router.route('/money')
    .get(currencyController.all)
    .post(currencyController.createCurrency);

router.route('/currency/:currencyId')
    .get(currencyController.read)
    .put(currencyController.update)
    .delete(currencyController.delete);


// lists Routes
router.route('/lists')
    .get(listsController.all)
    .post(listsController.createList);

router.route('/list/:listID')
    .get(listsController.read)
    .put(listsController.update)
    .delete(listsController.delete);



module.exports = router;