const Joi = require('joi');

const APIError = require('../utils/APIError');
const JoiObjectId = require('../utils/joi-objectid')(Joi);

const POST = require('../models/document');

exports.show = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

exports.validateDocument = {
  body: Joi.object({
    Name       : Joi.string().required().trim().replace(/\s\s+/g, ' '),
    offerLetter : Joi.string().required(),
    AppoinmentLetter :Joi.string().required(),
    DocumentsTakenDate :Joi.string().required(),
    marksheet10 :Joi.string().required(),
    marksheet12 :Joi.string().required(),
    bechelor_certificate :Joi.string().required(),
    master_degree_certificate :Joi.string().required(),
    ID_proof :Joi.string().required(),
    photo :Joi.string().required()
  })
}

exports.update = {
  params: Joi.object({
    id : JoiObjectId().required(),
  }),
  body: Joi.object({
    // title       : Joi.string().optional().trim().replace(/\s\s+/g, ' '),
    // description : Joi.string().optional().trim(),
    Name       : Joi.string().required().trim().replace(/\s\s+/g, ' '),
    offerLetter : Joi.string().required(),
    AppoinmentLetter :Joi.string().required(),
    DocumentsTakenDate :Joi.string().required(),
    marksheet10 :Joi.string().required(),
    marksheet12 :Joi.string().required(),
    bechelor_certificate :Joi.string().required(),
    master_degree_certificate :Joi.string().required(),
    ID_proof :Joi.string().required(),
    photo :Joi.string().required()
  }).required().not({})
}


exports.destroy = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

// exports.isExists = async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     const user = req.user;
//     const record = await POST.findOne({_id, isDeleted: false});
//     if(!record) throw new APIError({status: 404, message: `No record were found for given id`});    
//     if(JSON.stringify(record.user) !== JSON.stringify(user._id) && user.role.name === 'user'){
//       throw new APIError({status: 403, message: "You don't have sufficient access permission!"});
//     }
//     next();
//   }
//   catch(err) {next( err);}
// }