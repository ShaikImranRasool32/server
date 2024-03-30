const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: String,
    email: {
        type: String,
        unique: true,
    },
    createdAt: Date,
});

const Useri = mongoose.model('Useri', userSchema);

module.exports = Useri;
