const Joi = require('joi');

exports.validateRegister = {
  body: Joi.object({
    fullName    : Joi.string().required().max(40).trim(),
    email       : Joi.string().email().required().trim().lowercase(),
    DOB         : Joi.date().iso(),
    gender      : Joi.string().max(6).required(),
    contactNo  : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    emergencyContactNo : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    address     : Joi.string().required(),
    designation : Joi.string().required(),
    status :Joi.string(), 
    clgName              :Joi.string(),
    vehicalNo  : Joi.string(), 
    position              :Joi.string(),  
    attendenceCode       :Joi.string(),  
    password  : Joi.string().required().min(8).max(32).trim(),


    
    // maximum_qualification : Joi.string(),
         
    // university  : Joi.string(),    
         
        
    // attendence_code       :Joi.string(),      


    
    
    // designation : Joi.string().required(),
    
      
    // technology  : Joi.string(), 
    
    
    // clg_name              :Joi.string(),      
    
   
  })
}

exports.login = {
  body: Joi.object({
    email     : Joi.string().email().required().trim().lowercase(),
    password  : Joi.string().required().max(128).trim(),
  })
}
