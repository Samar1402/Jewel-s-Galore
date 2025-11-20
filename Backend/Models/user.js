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
    // --- CHANGE START: Add Security Key Field ---
    securityKey: {
        type: String, // String is best to keep leading zeros (e.g. "0123")
        required: true,
    },
    // --- CHANGE END ---
    profileImage: {
        type: String,
        default: "", 
    }
}, { timestamps: true });

const UserModel = mongoose.model('user', UserSchema); 
module.exports = UserModel;