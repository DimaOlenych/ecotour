const express = require('express');
const router = express.Router();

const pagesController = require('../controllers/pagesController');
const toursController = require('../controllers/toursController');

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

module.exports = router;