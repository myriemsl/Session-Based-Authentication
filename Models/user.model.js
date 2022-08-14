const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    date : {
        type: Date, 
        default: Date.now
    },
})

module.exports = mongoose.model('User', UserSchema);