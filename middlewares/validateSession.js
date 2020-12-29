exports.validateSession = async (req, res, next) => {
    if(req.session && req.session.user)
    {
        // res.redirect('/index');
        next();
    }
    else{
        res.render('login');
    }
}