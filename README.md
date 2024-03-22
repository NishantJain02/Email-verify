This is an email verification project which verifies your email with the help of OTP sent on email.
To initilize this project you need to download some of the packages given in package.json file.
After downloading packages , make an app password of your email from which you are sending OTP.app password is for giving authorization to the nodemailer for sending mail.
You can easily find "how to make app password" on google .
Make an env file name it as ".env" and the write code in that file as follow
                                PASS = //your app password//
then save the file.
Run the server using "node server.js" in your terminal and you are good to go.
