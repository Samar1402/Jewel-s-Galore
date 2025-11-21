const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    securityKey: {
        type: String, 
        required: true,
    },
    profileImage: {
        type: String,
        default: "", 
    }
}, { timestamps: true });

const UserModel = mongoose.model('user', UserSchema); 
module.exports = UserModel;