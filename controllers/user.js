const passport = require('passport');
const APIError = require('../utils/APIError');
const { toObject, generateJwt, removeFields } = require('../utils/helper');
const USER = require('../models/user');
const ROLE = require('../models/role');
const { validate } = require('express-validation');
const { login, validateRegister } = require('../validations/auth');


  exports.register = async (req, res, next) => {
    try {
      console.log("In employee create changed...");
      const payload = req.body;
      const role = await ROLE.findOne({name: new RegExp('user', 'i')}, '_id');
      if(!role) throw new APIError({message: 'It seems that the system role are not generated yet.'});
      const validateError=validateRegister.body.validate(payload).error;
      if(validateError)
      {
        throw new APIError({message:validateError.message,template:"admin/addEmployee",oldValues:payload})
      }
      payload.role = role._id;
      const user = await USER.create(payload);
     
     //return res.sendJson(200, { data: removeFields(user, ['password', 'role']), message: "Signup done successfully." });
     return res.sendRender("admin/employee",null,null,payload);

    } catch (error) { next(error); }
  }
/**
 * User login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      //if (err || !user) throw new APIError({status: 401, message: err ? err.message : 'Unauthorized access'});
      
      req.login(user, { session: false }, async (err) => {
        if (err) throw new APIError();
        const body = removeFields(user.toObject(), ['password']); 
        
        req.session.user = body;
        //return res.redirect('./index'); 
        //return res.render('./index');
      });

    }
    catch (err) { next(err); }

  })(req, res, next);
};

/**
 * Get all EMPLOYEEs
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.all = async (req, res, next) => {
  try {
    const employees = await USER.find({isDeleted: false}, '-__v -isDeleted -createdAt -updatedAt -deletedAt -deletedBy');
    //return res.sendJson(200, employees);
    console.log("employeeRecords");
    //return employees;
    res.render('admin/employee',{employeeRecords:employees})
  } catch (error) { next(error); }
}

/**
 * Get EMPLOYEE by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// exports.show = async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     const employee = await EMPLOYEE.findOne({_id, isDeleted: false});
//     return res.sendJson(200, removeFields(employee.toObject()));
//   } catch (error) { next(error); }
// }

/**
 * Create new EMPLOYEE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// exports.store = async (req, res, next) => {
//   try {
//     const payload = req.body;
//     const role = await ROLE.findOne({name: new RegExp('user', 'i')}, '_id');
//     if(!role) throw new APIError({message: 'It seems that the system role are not generated yet.'});
//     payload.role = role._id;
//     const employee = await EMPLOYEE.create(payload);
//     return res.sendJson(200, removeFields(employee.toObject(), ['role', 'password']));
//   } catch (error) { next(error); }
// }

/**
 * Update EMPLOYEE by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// exports.update = async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     const payload = req.body;
//     const _query = {_id, isDeleted: false};
//     const employee = await EMPLOYEE.findOneAndUpdate(_query, {$set: payload}, {new: true});
//     return res.sendJson(200, removeFields(employee.toObject(), ['user', 'comments']));
//   } catch (error) { next(error); }
// }

/**
 * Delete EMPLOYEE by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.destroy = async (req, res, next) => {
  try {
    const _id = req.params.id;
    
    console.log(_id);
    const _query = {_id, isDeleted: false};
    const _delete = {$set: {isDeleted: true}};
    await USER.findOneAndUpdate(_query, _delete);
    return res.sendJson(200, "EMPLOYEE deleted successfully");
  } catch (error) { next(error); }
}