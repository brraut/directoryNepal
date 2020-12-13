const router = require('express').Router();
const ReviewController = require('../controllers/ReviewController');


router.post('/store', ReviewController.store);
router.get('/', ReviewController.index);
router.post('/edit/:reviewId', ReviewController.update);


module.exports = router;