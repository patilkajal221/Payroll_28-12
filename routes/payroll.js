const router = require('express').Router();
const { validate } = require('express-validation');
const {isAuth} = require('../middlewares/authentication');
const PAYROLLREGISTER = require('../controllers/payroll');
const PAYROLL = require('../models/payroll');
const { all,show,update,destroy,isExists,create } = require('../validations/payroll');


//router.get('/', (req,res)=>{res.render('admin/payroll');})
//router.get('/addPayroll', (req,res)=>{res.render('admin/addPayroll');})
router.get('/',PAYROLLREGISTER.all);
router.get('/create', (req,res)=>{res.render('admin/addPayroll');})
//router.get('/update', (req,res)=>{res.render('admin/updatePayroll');})
router.post('/store',PAYROLLREGISTER.store);
router.get('/delete/:id',PAYROLLREGISTER.destroy);
//router.put('/update/:id',PAYROLLREGISTER.update);
//router.get('/', PAYROLL_CONTROLLER.all);
// router.get('/:id',isAuth(['admin','user']),validate(show), isExists,PAYROLL_CONTROLLER.show);
//router.post('/'/*, isAuth(['admin', 'user'])*/, validate(create), PAYROLL_CONTROLLER.store);
// router.put('/:id', isAuth(['admin','user']), validate(update), isExists, PAYROLL_CONTROLLER.update);
//router.delete('/:id',/*isAuth(['admin','user']),*/ validate(destroy), isExists, PAYROLL_CONTROLLER.destroy);

module.exports = router