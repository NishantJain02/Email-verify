const express=require('express');
const mailmeotp=require("./app");
const collection=require('./config');
const Onetime = ("created by Team CtrlSprinters")

const app= express();
const port = 1111;

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/signup",(req,res)=>{
  res.render("signup");
});
//signup page -> enter email
app.post("/signup",async(req,res)=>{
  const userEmail=req.body.email;
  const existingUser= await collection.findOne({email : userEmail });
  if(existingUser){
    const newOTP=mailmeotp(userEmail);
    existingUser.otp=newOTP;
    existingUser.otpCreatedAt= new Date();
    await existingUser.save();
  }
  else{
    const newOTP=mailmeotp(userEmail);
    const data={
      email: userEmail,
      otp: newOTP,
      otpCreatedAt: new Date()
    }
    const newuser=new collection(data);
    await newuser.save();
  }
  
  res.render("verifyotp",{
    userEmail: userEmail
  });
  
})

app.get("/verifyotp",(req,res)=>{
  res.render("verifyotp");
})
//otp verify
app.post("/verifyotp",async(req,res)=>{
  const userEmail=req.body.userEmail;
  const userOTP=req.body.otp;
  const user= await collection.findOne({email : userEmail});
  if((user.otp==userOTP) && (new Date()-user.otpCreatedAt<= (300 * 1000))){
    res.send("Naman Rohilla welcomes you " + Onetime);
  }
  else{
    res.send("OTP entered is not correct");
  }
  
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });