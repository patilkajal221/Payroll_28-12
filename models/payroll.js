const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
const { removeFields } = require('../utils/helper');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const PayrollSchema = new Schema({
    stipend                  : { type: Number},
    salary                   : { type: Number },
    increment                : { type: String },
    bondDuration             : { type: String },
    trainingStartDate        : { type: Date },
    trainingEndDate          : { type: Date },
    joiningDate              : { type: Date },
    bondCompletedDate        : { type: Date },
    NDA                      : { type: String },
    bond                     : { type: String },
    note                     : { type: String },
    user                     : { type: ObjectId, ref:"user", default: null },
    isDeleted                : { type: Boolean, default: false },
},
{
  timestamps: true,
});

PayrollSchema.pre(/^save$/, async function (next) {
  const jdate= this.trainingStartDate; 
  console.log(jdate.toLocaleDateString()); 
  console.log(jdate.getMonth()+1);
  total_month = (this.bondDuration);
  next();
});

PayrollSchema.methods.deleteFields = function (keys, defaultFields = true) {
    return removeFields(this.toObject(), keys, defaultFields);
  };

module.exports = mongoose.model('payroll', PayrollSchema, 'payrolls');