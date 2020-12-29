const router = require('express').Router();
const { validate } = require('express-validation');

const { all } = require('../validations/document');
const { show, create, update, destroy, isExists } = require('../validations/document');
const { isAuth } = require('../middlewares/authentication');

/**
 * Controllers
 */
const DOCUMENTREGISTER = require('../controllers/document');


router.get('/', (req,res)=>{res.render('admin/documents');})
router.post('/store',/*(req,res)=>{console.log(req.body)},*/DOCUMENTREGISTER.store);

//router.get('/', DOCUMENT.all);
//router.get('/:id',isAuth(['admin', 'user']), validate(show), DOCUMENT.show);
//router.post('/',(req, res, next) => {console.log(req.body); next()},/*upload, isAuth(['admin', 'user']),*/ validate(create), DOCUMENT.store);

//router.put('/:id', isAuth(['admin', 'user']), validate(update),DOCUMENT.update);
//router.delete('/:id', isAuth(['admin', 'user']), validate(destroy),DOCUMENT.destroy);
//router.get('/:id/comments', validate(all), COMMENT.all);
module.exports = router;