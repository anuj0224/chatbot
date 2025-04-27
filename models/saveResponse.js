const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: "gourav"
    },
    question: {
        type: String,
        trim: true
    },
    answer: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;