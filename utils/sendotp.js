const nodemailer = require('nodemailer');


const sendMail = async(rotp,sent_to, sent_from, reply_to)=>{

    const otp = rotp
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        PORT: 587,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized:false,
        }


    })
    const options = {
        from : {
            name:"K L Placement Office",
            address:sent_from,
        },
        to : sent_to,
        replyTo: reply_to,
        subject: "OTP From ABC-Organization",
        //html: htmlMessage,
        text: `Your OTP is ${otp}`,
        
    }

    //Send Mail
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}
module.exports = sendMail
