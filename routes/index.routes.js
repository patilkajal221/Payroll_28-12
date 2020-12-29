const { validateSession } = require('../middlewares/validateSession');

const router = require('express').Router();

console.log("In routes");
router.get('/',(req,res)=>{res.render('index');})
router.get('/index',(req,res)=>{res.render('index');})

//router.use('/auth', require('./auth'));
router.use('/employee',require('./user'));
router.use('/documents',require('./document'));
router.use('/payroll',require('./payroll')); 

// /router.get('/docs', (req,res)=>{res.render('admin/docs');})  
// router.get('/orders', (req,res)=>{res.render('admin/orders');})  
 router.get('/account', (req,res)=>{res.render('account');})  
//router.get('/login', (req,res)=>{res.render('login');})     
// router.get('/employee', (req,res)=>{res.render('admin/employee');})
// router.get('/notifications', (req,res)=>{res.render('admin/notifications');})
// router.get('/addEmployee', (req,res)=>{res.render('admin/addEmployee');})
// router.get('/documents', (req,res)=>{res.render('admin/documents');})
// router.get('/payroll', (req,res)=>{res.render('admin/payroll');})
// router.get('/addPayroll', (req,res)=>{res.render('admin/addPayroll');})
// // router.get('/login', (req,res)=>{res.render('login');})  
// router.get('/index ', (req,res)=>{res.render('index');})  

module.exports = router;
