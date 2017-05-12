import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
  // id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  name: String,
  email: String,
  password: String
});

let user = mongoose.model('user', userSchema);

export default user