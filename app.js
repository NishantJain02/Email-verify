const nodemailer= require('nodemailer');
require("dotenv").config();
function mailmeotp(userEmail){
    const transporter=nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        auth:{
            user: "nishantjain409@gmail.com",
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
        from: "nishantjain409@gmail.com",
        to: userEmail,
        subject: "Verify Your Account",
        text: "Nishant jain ne otp bejha hai"+newOTP
    }
    
    //send mail
    transporter.sendMail(mail,(error,info)=>{
        if(error) {
            console.log("Error aagya so called developer , nishant jain se puche error");
        }
        else{
            console.log("email sent: "+ info.response);
        }
    });
    return newOTP;
}

module.exports=mailmeotp;