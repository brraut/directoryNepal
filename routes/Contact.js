const router = require('express').Router();

const ContactController = require('../controllers/ContactController');

router.get('/', ContactController.index)
router.get('/:contactId', ContactController.show)
router.post('/store', ContactController.store)
router.get('/delete/:contactId', ContactController.destroy)

module.exports = router;