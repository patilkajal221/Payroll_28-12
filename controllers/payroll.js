const passport = require('passport');
const APIError = require('../utils/APIError');
const { toObject, generateJwt, removeFields } = require('../utils/helper');
const { validate } = require('express-validation');
const { validatePayroll } = require('../validations/payroll');
const PAYROLL = require('../models/payroll');

/**
 * Get all USER Payroll
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.all = async (req, res, next) => {
    try {
      const payrolls = await  PAYROLL.find({isDeleted: false}, '-__v -isDeleted -createdAt -updatedAt -deletedAt -deletedBy');
      //return res.sendJson(200, payrolls);
      res.render('admin/payroll',{payrollRecords:payrolls})
    } catch (error) { next(error); }
  }
  
/**
 * Get PAYROLL by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.show = async (req, res, next) => {
  try {
      const _id = req.params.id;
      const payroll = await PAYROLL.findOne({_id, isDeleted: false})
      .populate({path: 'user', select: 'fullName'})
      return res.sendJson(200, removeFields(payroll.toObject()));
  } catch (error) { next(error); }
}
  
/**
 * Create new PAYROLL
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.store = async (req, res, next) => {
  try {
    const payload = req.body;
    //const validateError=validatePayroll.body.validate(payload).error;
    const validateError=validatePayroll.body.validate(payload).error;
    if(validateError)
    {
      throw new APIError({message:validateError.message,template:"admin/addPayroll",oldValues:payload})
    }
    //const user = await USER.findOne({name: new RegExp('user', 'i')}, '_id');
    //if(!USER) throw new APIError({message: 'It seems that the system has no user.'});
    //payload.user = req.user._id;
    const payroll = await PAYROLL.create(payload);
    //return res.sendJson(200, removeFields(payroll.toObject(), []));
    return res.sendRender("admin/payroll",null,null,payload);

  } catch (error) { next(error); }
}
  
/**
 * Update PAYROLL by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.update = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const payload = req.body;
    const validateError=validatePayroll.body.validate(payload).error;
    if(validateError)
    {
      throw new APIError({message:validateError.message,template:"admin/addPayroll",oldValues:payload})
    }
    const _query = {_id, isDeleted: false};
    const payroll = await PAYROLL.findOneAndUpdate(_query, {$set: payload}, {new: true});
    //return res.sendJson(200, removeFields(payroll.toObject(), []));
    return res.sendRender("admin/payroll",null,null,payload);
  } catch (error) { next(error); }
}
  
/**
 * Delete PAYROLL by given id
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
    await PAYROLL.findOneAndUpdate(_query, _delete);
  //  return res.sendJson(200, "Payroll is deleted successfully");
    return res.sendRender("admin/addPayroll",null,null);
  } catch (error) { next(error); }
}