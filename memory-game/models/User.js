const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    level:{
        type: 'number',
        default:0
    }
});

const User=mongoose.model('User', userSchema);

module.exports = User;