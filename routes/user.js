const router = require('express').Router();
const USERREGISTER=require('../controllers/user');


router.get('/',USERREGISTER.all);
//router.get('/', (req,res)=>{res.render('admin/employee',{data:'Employee Record'});})
router.get('/create', (req,res)=>{res.render('admin/addEmployee');})
router.post('/store',USERREGISTER.register);

// router.get('/:id',isAuth(['admin','user']),validate(show), isExists,USER_CONTROLLER.show);
// router.put('/:id', isAuth(['admin','user']), validate(update), isExists, USER_CONTROLLER.update);
router.get('/delete/:id',/*validate(destroy), isExists,*/ USERREGISTER.destroy);

module.exports = router