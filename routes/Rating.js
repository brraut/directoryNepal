const router = require('express').Router();
const RatingController  = require('../controllers/RatingController');

router.get('/', RatingController.index);
router.get('/show/:companyId/:userId', RatingController.show);
router.post('/store', RatingController.store);

module.exports = router;