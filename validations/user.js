const Joi = require('joi');

const APIError = require('../utils/APIError');
const JoiObjectId = require('../utils/joi-objectid')(Joi);

const USER = require('../models/user');

exports.show = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

exports.create = {
  body: Joi.object({
    fullName    : Joi.string().required().max(40).trim(),
    DOB         : Joi.date().iso(),
    gender      : Joi.string().max(6).required(),
    address     : Joi.string().required(),
    email       : Joi.string().email().required().trim().lowercase(),
    password  : Joi.string().required().min(8).max(32).trim(),
    contact_no  : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    emergency_contact_no : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    designation : Joi.string().required(),
    status                : Joi.string(),
    clg_name              : Joi.string(),
    position              : Joi.string(),
    attendence_code       : Joi.string(),


    maximum_qualification : Joi.string(),
    university  : Joi.string(),      
    technology  : Joi.string(),       
    vehical_no  : Joi.string(),      
  })
}

exports.update = {
  params: Joi.object({
    id : JoiObjectId().required(),
  }),
  body: Joi.object({
    fullName    : Joi.string().required().max(40).trim(),
    DOB         : Joi.date().iso(),
    gender      : Joi.string().max(6).required(),
    address     : Joi.string().required(),
    email       : Joi.string().email().required().trim().lowercase(),
    password  : Joi.string().required().min(8).max(32).trim(),
    contact_no  : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    emergency_contact_no : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    designation : Joi.string().required(),
    maximum_qualification : Joi.string(),
    university  : Joi.string(),      
    technology  : Joi.string(), 
    vehical_no  : Joi.string(),      
    status                :Joi.string(),      
    clg_name              :Joi.string(),      
    position              :Joi.string(),      
    attendence_code       :Joi.string(),    

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
    const user = req.user;
    //console.log(_id);
    const record = await USER.findOne({_id, isDeleted: false});
    if(!record) throw new APIError({status: 404, message: `No record were found for given id`});    
    if(JSON.stringify(record.user)){
      throw new APIError({status: 403, message: "You don't have sufficient access permission!"});
    }
    next();
  }
  catch(err) {next( err);}
}