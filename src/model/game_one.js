var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gameOneSchema = new Schema({
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

module.exports = mongoose.model('gameOne', gameOneSchema);
