const Joi = require('joi');
const APIError = require('../utils/APIError');
const JoiObjectId = require('../utils/joi-objectid')(Joi);

const PAYROLL = require('../models/payroll');

exports.show = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

exports.validatePayroll = {
  body: Joi.object({
    stipend             : Joi.number().required(),
    salary              : Joi.number().required(),
    increment           : Joi.string().required(),
    bondDuration        : Joi.string().required(),
    trainingStartDate   : Joi.date().iso(),
    trainingEndDate     : Joi.date().iso(),
    joiningDate         : Joi.date().iso(),
    bondCompletedDate   : Joi.date().iso(),
    NDA                 : Joi.string().required(),
    bond                : Joi.string().required(),
    note                : Joi.string().trim(), 
    
   })
}

exports.update = {
  params: Joi.object({
    id : JoiObjectId().required(),
    }),
  body: Joi.object({
    stipend             : Joi.number().required(),
    salary              : Joi.number().required(),
    increment           : Joi.string().required(),
    bondDuration        : Joi.string().required(),
    trainingStartDate   : Joi.date().iso(),
    trainingEndDate     : Joi.date().iso(),
    joiningDate         : Joi.date().iso(),
    bondCompletedDate   : Joi.date().iso(),
    NDA                 : Joi.boolean().required(),
    bond                : Joi.boolean().required(),
    note                : Joi.string().trim(),   
  }).required().not({})
}


exports.destroy = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

exports.isExists = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const payroll = req.payroll;
    const record = await PAYROLL.findOne({_id, isDeleted: false});
    if(!record) throw new APIError({status: 404, message: `No record were found for given id`});    
    if(JSON.stringify(record.payroll)){
      throw new APIError({status: 403, message: "You don't have sufficient access permission!"});
    }
    next();
  }
  catch(err) {next( err);}
}