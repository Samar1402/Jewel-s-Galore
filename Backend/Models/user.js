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
    },
    role: {
        type: String,
        required: true,
        default: 'user', 
        enum: ['user', 'admin'] 
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema); 
module.exports = UserModel;