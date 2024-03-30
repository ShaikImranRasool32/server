const mongoose  = require('mongoose')

const userotpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 120, // Set the expiration time to 2 minutes (120 seconds)
    },
});

const userotp = mongoose.model('userotp', userotpSchema);
module.exports = userotp;
