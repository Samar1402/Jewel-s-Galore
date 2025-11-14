const { signup, login, getUser } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const authMiddleware = require('../Middlewares/AuthMiddleware');

const router = require ('express').Router();



router.post('/login',loginValidation, login)
router.post('/signup',signupValidation,signup)
router.get('/me', authMiddleware, getUser);


module.exports = router;