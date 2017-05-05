var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    todos: {
        type: Array,
        default: []
    }
});

UserSchema.plugin(require('mongoose-findorcreate'));

var User = mongoose.model('users', UserSchema);

module.exports = User;