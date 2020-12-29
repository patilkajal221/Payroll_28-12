const router = require('express').Router();
const { validate } = require('express-validation');

const { login, signup } = require('../validations/auth');

// const { create } = require('../../validations/user');
/**
 * Controllers
 */
const AUTH=require('../controllers/auth');
// const USERC=require('../../controllers/user');
const USER=require('../models/user');

router.get('/login', (req,res)=>{res.render('login');})  
router.post('/login', (req, res, next) => {console.log(req.body); next()},  validate(login), AUTH.login);


module.exports = router;
