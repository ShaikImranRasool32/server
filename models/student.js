const mongoose = require('mongoose');
const {Schema} = mongoose;

const StudentSchema = new Schema({ 
    ID:{ 
        type:String, 
        unique:true, 
        required:true, 
    }, 
    name:{ 
        type:String, 
        required:true, 
    }, 
    course:{ 
        type:String, 
        required:true, 
    }, 
    cgpa:{ 
        type:Number, 
        required:true, 
    }, 
    mobilenumber:{ 
        type:String, 
        required:true, 
    }, 
    mail:{ 
        type:String, 
        required:true, 
    } 
}) 
const StudentModel = mongoose.model("Student",StudentSchema); 
module.exports = StudentModel;





