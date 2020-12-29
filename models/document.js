const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DocumentSchema = new Schema({
  Name         : { type: String, require: true },
  offerLetter   : { type: String, require: true },
  //user          : { type: ObjectId, ref:'user', default: null },
  AppoinmentLetter: { type: String, require: true },
  DocumentsTakenDate:{ type: String, default: null},
  marksheet10:{ type: String, require: true },
  marksheet12:{ type: String},
  bechelor_certificate:{ type: String, require: true },
  master_degree_certificate:{ type: String},
  ID_proof:{ type: String, require: true },
  photo:{ type: String, require: true },
  isDeleted     : { type: Boolean, default: false },
  deletedBy     : { type: ObjectId, ref:'user', default: null },
  deletedAt     : { type: Date, default: null },
},
{
  timestamps: true,
});

module.exports = mongoose.model('document', DocumentSchema, 'documents');
