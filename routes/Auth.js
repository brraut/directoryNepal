const router = require('express').Router();
const authenticate = require('../middleware/authenticate');

const AuthController = require('../controllers/AuthController');



router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/user', authenticate,  AuthController.user)
router.get('/activate/user/:hash', AuthController.activate)

  



module.exports = router;