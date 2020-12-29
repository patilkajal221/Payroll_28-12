const mongoose = require('mongoose');
const bcryptJs = require('bcryptjs');
const { bcrypt } = require('../config');
const APIError = require('../utils/APIError');
const { removeFields } = require('../utils/helper');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const UserSchema = new Schema({
  fullName              : { type: String, require: true },
  email                 : { type: String, required: true, unique: true },
  DOB                   : { type: Date },
  gender                : { type: String },
  contactNo            : { type: Number },
  emergencyContactNo  : { type: Number },
  address               : { type:String },
  designation           : { type:String },
  status                : { type:String },
  clgName              : { type:String },
  vehicalNo            : { type:String },
  position              : { type:String },
  attendenceCode       : { type:String,default:"Bigscal_"},
  password              : { type: String, default: null, require: true },
  role                  : { type: ObjectId, ref:"role", default: null },
  isDeleted             : { type: Boolean, default: false },


  // confirm_password      : { type:String },
  // maximum_qualification : { type:String },
  // university            : { type:String },
  // technology            : { type:String },
 
},
{
  timestamps: true,
});

/**
*  Check email is unique or not
*/
UserSchema.pre(/^save$/, true, async function (next, done) {
  try{
    const self = this;
    const record = await mongoose.models['user'].findOne({ _id: { $ne: self._id }, email: self.email, isDeleted: false });
    record ? done(new APIError({status: 409, message: `"email" already exists`})) : done();
    next();
  }
  catch (err) { done(err); next(); }
});


UserSchema.pre(/^save$/, async function (next) {
  if (!this.isModified('password')) return next();
  const hash = await bcryptJs.hash(this.password, parseInt(bcrypt.salt));
  this.password = hash;
  next();
});

UserSchema.pre(/^findOneAndUpdate$/, true, async function (next, done) {
  const self = this;
  
  if(self.op && self.op === 'findOneAndUpdate') {
    if(!self._update.$set.password){ done(); next(); }
    const hash = await bcryptJs.hash(self._update.$set.password, parseInt(bcrypt.salt));
    self._update.$set.password = hash;
    console.log(hash);
  }
  
  done();
  next();
});

/**
*  Delete not required fields
*/
UserSchema.methods.deleteFields = function (keys, defaultFields = true) {
  return removeFields(this.toObject(), keys, defaultFields);
};

UserSchema.methods.isValidPassword = async function(password){
  return await bcryptJs.compare(password, this.password);
}

module.exports = mongoose.model('user', UserSchema, 'users');