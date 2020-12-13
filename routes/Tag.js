const router = require('express').Router();

const TagController = require('../controllers/TagController');

router.get('/:catId', TagController.index);
router.post('/store', TagController.store);
router.get('/show/:tagId', TagController.show);
router.post('/update/:tagId', TagController.update);
router.get('/delete/:tagId', TagController.destroy);


module.exports = router;