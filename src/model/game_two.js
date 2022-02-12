var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gameTwoSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    score: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('gameTwo', gameTwoSchema);
