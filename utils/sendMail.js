const nodemailer = require('nodemailer');

const sendMail = async (subject, textMessage, sent_to, sent_from, reply_to) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const options = {
        from: {
            name: "K L Placements Office",
            address: sent_from,
        },
        to: sent_to,
        replyTo: reply_to,
        subject: subject,
        text: textMessage,
    };

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendMail;
