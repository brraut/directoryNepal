const router = require('express').Router();

const CategoryController = require('../controllers/CategoryController');


router.get('/', CategoryController.index);
router.post('/store', CategoryController.store );
router.get('/show/:categoryId', CategoryController.show);
router.post('/update/:categoryId', CategoryController.update);
router.get('/delete/:categoryId', CategoryController.destroy);

module.exports = router;