var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    login: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },
    name: {
        type: String,
        required: true
    },
    todos: {
        type: [
            {
                text: {
                    type: String,
                    required: true
                },
                completed: {
                    type: Boolean,
                    default: false
                },
                timeLimited: {
                    type: Boolean,
                    default: false
                },
                timeLimit: {
                    type: String,
                    default: ''
                }
            }
        ],
        default: []
    }
});

UserSchema.plugin(require('mongoose-findorcreate'));

var User = mongoose.model('users', UserSchema);

module.exports = User;