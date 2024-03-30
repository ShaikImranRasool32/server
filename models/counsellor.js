const mongoose = require('mongoose');
const {Schema} = mongoose;

const CounsellorSchema = new Schema({
    CID: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      Branch: {
        type: String,
        required: true,
      },
      Designation: {
        type: String,
        required: true,
      },
      StudentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
      }],
});
