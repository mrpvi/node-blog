import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, require: true, min: 4, unique: true},
    password: {type: String, require: true, min: 8,},
})

const UserModel = model('User', userSchema);

export default UserModel;