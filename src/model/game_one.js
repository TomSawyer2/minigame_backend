var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gameOneSchema = new Schema({
    token: {
        type: String
    },
    username: {
        type: String
    },
    phone: {
        type: String
    },
    studentId: {
        type: String
    },
    score: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('gameOne', gameOneSchema);
