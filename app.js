const nodemailer= require('nodemailer');
require("dotenv").config();
function mailmeotp(userEmail){
    const transporter=nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        auth:{
            user: "//your email id",
            pass: process.env.PASS // app password 
        }
    })
    //making otp
    function makeMyOTP(){
        let otp=Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    }
    const newOTP=makeMyOTP(6); //(6) 6-digit otp
    // mail construction
    const mail={
        from: "//your email id",
        to: userEmail,
        subject: "Verify Your Account",
        text: "your otp is"+newOTP
    }
    
    //send mail
    transporter.sendMail(mail,(error,info)=>{
        if(error) {
            console.log("error");
        }
        else{
            console.log("email sent: "+ info.response);
        }
    });
    return newOTP;
}

module.exports=mailmeotp;
