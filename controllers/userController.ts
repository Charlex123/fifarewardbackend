export {};
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Referral = require("../models/referralModel");
const Bets = require("../models/betsModel")
const generateToken = require("../utils/generateToken");
const generateRanNum = require("../utils/generateRanNum");
const generateUid = require("../utils/generateUid");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
// const sgTransport = require("nodemailer-sendgrid-transport");

process.env.TZ = 'Europe/London';

// async..await is not allowed in global scope, must use a wrapper
  // create reusable transporter object using the default SMTP transport
  // const frontendurl = process.env.FRONTEND_URL;
  // console.log('frontend url',frontendurl)

  interface directRefs {
    user_objId: any; // Assuming user_objId is of type string, adjust accordingly
    userId: any
    // Add other properties if needed
  }
  interface firstGenDownlines {
    userId: any; // Assuming user_objId is of type string, adjust accordingly
    user_objId: any;
    // Add other properties if needed
  }
  interface SecondGenRefs {
    userId: any; // Assuming user_objId is of type string, adjust accordingly
    user_objId: any;
    // Add other properties if needed
  }
  interface secondGenDownlines {
    user_objId: any;
    userId: any; // Assuming user_objId is of type string, adjust accordingly
    // Add other properties if needed
  }
  interface thirdGenRefs {
    user_objId: any; // Assuming user_objId is of type string, adjust accordingly
    userId: any
    // Add other properties if needed
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "fifarewarddapp@gmail.com",
      pass: "jwgx oums znnv sqdi",
    },
  });


  
  // transporter.sendMail(email, function(err, info){
  //     if (err ){
  //       console.log(err);
  //     }
  //     else {
  //       console.log('Message sent: ' + info.response);
  //     }
  // });

  transporter.verify((error:any, success:any) => {
    if(error) {
     console.log(error) 
    }else {
      console.log("ready for message");
      console.log(success);
    }
  })

  
  const sendverificationMail = (_id:string,username:string,emailCode:number,email:string,res:any) => {
      
    const mailOptions = {
      from: {name:'Fifa Reward',address:process.env.AUTH_EMAIL},
      to: email,
      subject: "Confirm Your Email",
      html: `<html>
          <head>
          <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
          <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
          <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
          <style type='text/css'>
              body {
                  font-family: Tahoma;color: #545454;font-weight: 400;font-size: 14px;
              }
              .btn-c {
                  width: 100%;margin: 10px auto;text-align: center;cursor: pointer;
              }
              .btn-c a {
                  cursor: pointer !important;
              }
              .btn-c a button {
                  cursor: pointer !important;
              }
              span {
                text-transform: capitalize;
              }
              div {
                  color: #545454;font-size: 14px;font-family: Tahoma;
              }
              button {
                  background-color: #545454 !important;border: none;font-weight: bold;font-family: sans-serif;color: white;padding: 10px 30px;margin: 1rem auto;text-align: center;border-radius: 4px;cursor: pointer;
              }
              p {
                  color: #545454;font-size: 14px;font-family: Tahoma;width: 100%;
              }
              p a {
                  font-weight: bold;color: #e2d7d7 !important;background-color: #1c1f2b;padding: 12px 38px;
                  font-family: Tahoma;font-size: 14px;margin: 2rem auto;text-align: center;border-radius: 4px;
              }
          </style>
          </head>
          <body>
            <div>
              <p>Hello <span> ${username},</span> you have signed up with FifaReward. </p>
              <p>Confirm your email with the link below to have access to our platform <br/><br><br>
                <a href="https://fifareward.onrender.com/api/users/activateaccount/${username}/${emailCode}/${uuidv4()}">Confirm Email</a>
              </p>
            </div>
          </body>
        </html>`,
    }
    
    const sender = transporter.sendMail(mailOptions);
    if(sender){
      console.log("Message sent: %s", sender.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sender));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      res.json({
        message: username,
      })
    }
  }

  const re_sendverificationMail = (_id:string,username:string,emailCode:number,email:string,res:any) => {
      
    const mailOptions = {
      from: {"name":'Fifa Reward',address:process.env.AUTH_EMAIL},
      to: email,
      subject: "Confirm Your Email",
      html: `<html>
          <head>
          <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
          <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
          <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
          <style type='text/css'>
              body {
                  font-family: Tahoma;color: #545454;font-weight: 400;font-size: 14px;
              }
              .btn-c {
                  width: 100%;margin: 10px auto;text-align: center;cursor: pointer;
              }
              .btn-c a {
                  cursor: pointer !important;
              }
              .btn-c a button {
                  cursor: pointer !important;
              }
              span {
                text-transform: capitalize;
              }
              div {
                  color: #545454;font-size: 14px;font-family: Tahoma;
              }
              button {
                  background-color: #545454 !important;border: none;font-weight: bold;font-family: sans-serif;color: white;padding: 10px 30px;margin: 1rem auto;text-align: center;border-radius: 4px;cursor: pointer;
              }
              p {
                  color: #545454;font-size: 14px;font-family: Tahoma;width: 100%;
              }
              p a {
                  font-weight: bold;color: #e2d7d7 !important;background-color: #1c1f2b;padding: 12px 38px;
                  font-family: Tahoma;font-size: 14px;margin: 2rem auto;text-align: center;border-radius: 4px;
              }
          </style>
          </head>
          <body>
            <div>
              <p>Hello <span> ${username},</span> you have signed up with FifaRewrd. </p>
              <p>Confirm your email with the link below to have access to our platform <br/><br><br>
                <a href="https://fifareward.onrender.com/api/users/activateaccount/${username}/${emailCode}/${uuidv4()}">Confirm Email</a>
              </p>
            </div>
          </body>
        </html>`,
    }
    
    const sender = transporter.sendMail(mailOptions);
    if(sender){
      console.log("Message sent: %s", sender.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sender));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      res.json({
        message: "Activation code email resend success",
      })
    }
  }


  const verificationSuccess = (username:string,email:string, res:any) => {
      
    const mailOptions = {
      from: {"name":'Fifa Reward',address:process.env.AUTH_EMAIL},
      to: email,
      subject: "Email Verificaton Success",
      html: `<html>
      <head>
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
      <style type='text/css'>
          body {
              font-family: Tahoma;color: #545454;font-weight: 400;font-size: 14px;
          }
          .btn-c {
              width: 100%;margin: 10px auto;text-align: center;cursor: pointer;
          }
          .btn-c a {
              cursor: pointer !important;
          }
          .btn-c a button {
              cursor: pointer !important;
          }
          span {
            text-transform: capitalize;
          }
          div {
              color: #545454;font-size: 14px;font-family: Tahoma;
          }
          button {
              background-color: #545454 !important;border: none;font-weight: bold;font-family: sans-serif;color: white;padding: 10px 30px;margin: 1rem auto;text-align: center;border-radius: 4px;cursor: pointer;
          }
          p {
              color: #545454;font-size: 14px;font-family: Tahoma;width: 100%;
          }
          p a {
              font-weight: bold;color: #e2d7d7 !important;background-color: #1c1f2b;padding: 12px 38px;
              font-family: Tahoma;font-size: 14px;margin: 2rem auto;text-align: center;border-radius: 4px;
          }
      </style>
      </head>
        <body>
          <div>
            <div>Hi <span>${username}</span>,</div><br>
            <div>You've successfully activated your account, you can now sign in.</div><br><br>
            <a href="https://www.fifareward.io/signin">Confirm Email</a>
            <br>
            <div>
                <p>
                  Best Regards,<br><br>FifaReward
                </p>
            </div>
          </div>
        </body>
      </html>`,
    }
    
    const sender = transporter.sendMail(mailOptions);
    if(sender){
      console.log("Message sent: %s", sender.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      res.redirect(`https://www.fifareward.io/accountactivatestatus/${username}`)
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sender));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
  }
  

  const sendresetpasswordEmail = (username:string,email:string, res:any) => {
      
    const mailOptions = {
      from: {name:'Fifa Reward',address:process.env.AUTH_EMAIL},
      to: email,
      subject: "Reset Password Success",
      html: `<html>
      <head>
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
      <style type='text/css'>
          body {
              font-family: Tahoma;color: #545454;font-weight: 400;font-size: 14px;
          }
          .btn-c {
              width: 100%;margin: 10px auto;text-align: center;cursor: pointer;
          }
          .btn-c a {
              cursor: pointer !important;
          }
          .btn-c a button {
              cursor: pointer !important;
          }
          span {
            text-transform: capitalize;
          }
          div {
              color: #545454;font-size: 14px;font-family: Tahoma;
          }
          button {
              background-color: #545454 !important;border: none;font-weight: bold;font-family: sans-serif;color: white;padding: 10px 30px;margin: 1rem auto;text-align: center;border-radius: 4px;cursor: pointer;
          }
          p {
              color: #545454;font-size: 14px;font-family: Tahoma;width: 100%;
          }
          p a {
              font-weight: bold;color: #e2d7d7 !important;background-color: #1c1f2b;padding: 12px 38px;
              font-family: Tahoma;font-size: 14px;margin: 2rem auto;text-align: center;border-radius: 4px;
          }
      </style>
      </head>
        <body>
          <div>
            <div>Hi <span>${username}</span>,</div><br>
            <div>You've successfully reset your success</div>
            <br>
            <div>
                <p>
                  Best Regards,<br>FifaReward
                </p>
            </div>
          </div>
        </body>
      </html>`,
    }
    
    const sender = transporter.sendMail(mailOptions);
    if(sender){
      console.log("Message sent: %s", sender.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      res.json({
        message:"success"
      })
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sender));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
  }


//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req:any, res:any) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    const status = user.status;
    if(status == 'Active') {
      // get user id
      const userId = user.userId;
      //check if user has a referral
      res.status(201).json({
          _id: user._id,
          username: user.username,
          userId: user.userId,
          sponsorId: user.sponsorId,
          email: user.email,
          isinfluencer: user.isinfluencer,
          badge: user.bagde,
          tpin: user.tpin,
          status: user.status,
          activated: user.activated,
          isAdmin: user.isAdmin,
          bscwalletaddress: user.bscwalletaddress,
          pic: user.pic,
          token: generateToken(user._id),
        });
    }else {
      res.json({
        message:"Your account is inactive, activate it using the activation link sent to your email"
      })
    }
  } else {
    res.json({
      message: "Invalid Email or Password",
    });
    throw new Error("Invalid Email or Password");
  }
});


//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req:any, res:any) => {
  const { 
    username, 
    sponsorId,
    email, 
    password,
    isinfluencer,
    badge,
    tpin, 
    status,
    bscwalletaddress,
    bscwalletprivatekey,
    pic 
  } = req.body;
  
  console.log("req body",req.body);
  const userExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });
  
  if (usernameExists) {
    res.json({
      message:"Username already exists",
    });
    return;
  }
  if (userExists) {
    res.json({
      message:"User already exists"
    });
    return;
  }

  const user = await User.create({
    username,
    userId: generateUid(),
    sponsorId,
    email,
    password,
    isinfluencer,
    badge,
    tpin,
    status,
    bscwalletaddress,
    bscwalletprivatekey,
    emailcode: generateRanNum(),
    pic
  });

  if (user) {
    console.log("is influencer",isinfluencer);
    const sponsorId = req.body.sponsorId;
    console.log('sponsorId found',sponsorId)
    const refGeneration = "First";
    if(sponsorId) {
      // get sponsor objectId
      const sponsorobjId = await User.findOne({userId:sponsorId})
      console.log('sponsr deta', sponsorobjId)
      const user_objId = user._id;
      const sponsor_objId = sponsorobjId._id;

      const ref = await Referral.create({
        sponsorId,sponsor_objId,user_objId,refGeneration
      });

      if(ref) {
        // check if sponsor has an upline
        const addrefId = User.updateOne(
          {_id:user._id}, 
          {refId: ref._id },
          {multi:true}, 
            function(err:any, numberAffected:any){  
            });
        if(addrefId) {

        }
      }
    }else {

    }
    const _id = user._id;
    const username = user.username;
    const emailCode = user.emailcode;
    const email = user.email;
    const verifystatus = user.verified;

    if(verifystatus === false) {
      sendverificationMail(_id,username,emailCode,email,res);
    }
    
    // res.status(201).json({
    //   _id: user._id,
    //   username: user.username,
    //   email: user.email,
    //   level: user.level,
    //   tpin: user.tpin,
    //   status: user.status,
    //   activated: user.activated,
    //   isAdmin: user.isAdmin,
    //   trxwalletaddressbase58: user.trxwalletaddressbase58,
    //   trxwalletaddresshex:user.trxwalletaddresshex,
    //   bscwalletaddress: user.bscwalletaddress,
    //   pic: user.pic,
    //   token: generateToken(user._id),
    // });

  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const getReferrals = asyncHandler(async (req:any,res:any) => {
  const userId = req.params.sponsorId;
  
  const directrefs:directRefs[] = await Referral.find({ sponsorId: userId });

  const firstgenobjids = directrefs.map((key:directRefs) => (
    key.user_objId
  ));
  
  const firstgenDownlines:firstGenDownlines[] = await User.find().where('_id').in(firstgenobjids).exec();
  const secondgensponsors = firstgenDownlines.map((key:firstGenDownlines) => (
    key.userId
  ));
  const secondgenrefs: SecondGenRefs[]= await Referral.find().where('sponsorId').in(secondgensponsors).exec();
  const secondgenobjids = secondgenrefs.map((key:SecondGenRefs) => (
    key.user_objId
  ));
  const secondgenDownlines:secondGenDownlines[] = await User.find().where('_id').in(secondgenobjids).exec();
  const thirdgensponsors = secondgenDownlines.map(key => (
    key.userId
  ));
  const thirdgenrefs:thirdGenRefs[] = await Referral.find().where('sponsorId').in(thirdgensponsors).exec();
  const thirdgenobjids = thirdgenrefs.map((key:thirdGenRefs) => (
    key.user_objId
  ));
  const thirdgenDownlines = await User.find().where('_id').in(thirdgenobjids).exec();
  console.log('second obij sss',secondgenrefs)
  res.json({
    firstgendownlines: firstgenDownlines,
    secondgendownlines: secondgenDownlines,
    thirdgendownlines: thirdgenDownlines
  })
})

const getSponsor = asyncHandler(async (req:any,res:any) => {
  const user_objId = req.body.userObjId;
  console.log('u obji',user_objId)
  // get details of user sponsor
  const sponsor = await Referral.findOne({ "user_objId": user_objId });
  if(sponsor) {
    const sponsorId = sponsor.sponsorId;
    // get sponsor wallet address
    const sponsorwalletaddress = await User.findOne({"userId": sponsorId});
    const sponsorwaddr = sponsorwalletaddress.walletaddress; 
    res.json({
      message: sponsorwaddr
    })
  }else {
    res.json({
      message: "You do not have a sponsor"
    })
  }
})

const getWalletAddress = asyncHandler(async (req:any,res:any) => {
  const username = req.body.username;
  // get details of user sponsor
  const user_ = await User.findOne({ "username": username });
  if(user_) {
    const wa = user_.walletaddress;
    // get sponsor wallet address
    res.json({
      message: wa
    })
  }else {
    res.json({
      message: "Wallet address not found"
    })
  }
  
  
})


// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req:any,res:any) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


const updateTransactionPin = asyncHandler(async (req:any,res:any) => {
  const userid = req.body.userid;
  const user = await User.findById(userid);
  if (user) {
    user.tpin = req.body.tpin;
    
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      tpin: updatedUser.tpin,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const resetPassword = asyncHandler(async (req:any,res:any) => {
    const email = req.body.email;
    const user = await User.findOne({email});
    if (user) {
      user.password = req.body.newpassword;
      
      const updatedUser = await user.save();
      const username = updatedUser.username;
      sendresetpasswordEmail(username,email,res)
      
    } else {
      res.json({
        message: "user not found"
      });
      throw new Error("User Not Found");
    }
});


const activateAccount = asyncHandler(async (req:any,res:any) => {
  const username = req.params.username;
  const email__code = req.params.emailcode;
  
  const activateAcc = await User.findOne({username});

  if (activateAcc) {
    
    activateAcc.verified = true;
    
    const activAcc = await activateAcc.save();
    const email = activAcc.email;
    const email_code = activateAcc.emailcode;
    if(email_code == email__code) {
      const activatedAcc = await User.updateOne(
        {username:username}, { $set: {status: "Active"}});

      if(activatedAcc) {
        verificationSuccess(username, email, res);
      }
    }
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
});

const updateWalletAddress = asyncHandler(async (req:any,res:any) => {
  const {walletaddress, username} = req.body;
  const findUser = await User.findOne({username});
  console.log("wa add",walletaddress)
  if (findUser) {
    
    findUser.verified = true;
    
    const found_User = await findUser.save();
    if(found_User) {
      const foundUser = await User.updateOne(
        {username:username}, { $set: {walletaddress: walletaddress}});

      if(foundUser) {
        res.json({
          message: "wallet update success",
        });
      }
    }
    } else {
      res.json({message: "User not found"});
    }
});


const verifyUser = asyncHandler(async (req:any,res:any) => {
  const verifyuser = await User.findById(req.user._id);

  if (verifyuser) {
    verifyuser.verified = true;
    
    const verifiedUser = await verifyuser.save();
    const _id = verifiedUser._id;
    const username = verifiedUser.username;
    const email = verifiedUser.email;

      verificationSuccess(username, email, res);
      res.json({
        _id: verifiedUser._id,
        username: verifiedUser.username,
        email: verifiedUser.email,
        pic: verifiedUser.pic,
        isAdmin: verifiedUser.isAdmin,
        token: generateToken(verifiedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
});

const checkUserName = asyncHandler(async (req:any,res:any) => {
  const {username} = req.body
  
  const verifyusername = await User.findOne({username});

  if (verifyusername) {
    verifyusername.verified = true;
      res.json({
        message: username + " already exits, choose another"
      });
    } else {
      res.json({
        message: username + " is ok"
      });
    }
});

const checkEmail = asyncHandler(async (req:any,res:any) => {
  const {email} = req.body;
  const verifyemail = await User.findOne({email});

  if (verifyemail) {
      const status = verifyemail.status;
      if(status == 'Active') {
        res.json({
          message: email + " already exists, choose another one",
        });
      }else {
        res.json({
          message: email + " is already registered and the account is inactive, verify your account using the activation link sent to yur email",
        });
      }
      
    } else {
      res.json({
        message: email + " is ok",
      });
    }
});

const checkloginEmail = asyncHandler(async (req:any,res:any) => {
  const {email} = req.body;
  const verifyemail = await User.findOne({email});

  if (verifyemail) {
      const status = verifyemail.status;
      if(status == 'Active') {
        res.json({
          message: email + " is verified, enter password and click login",
        });
      }else {
        res.json({
          message: "Account is inactive, verify your account using the activation link sent to yur email",
        });
      }
    } else {
      res.json({
        message: email + " does not exit, click on the register button at the bottom of this pop up modal",
      });
    }
});

const checkForgotEmail = asyncHandler(async (req:any,res:any) => {
  const {email} = req.body;
  const verifyemail = await User.findOne({email});

  if (verifyemail) {
      res.json({
        message: email + " found, enter new password",
      });
    } else {
      res.json({
        message: "Email not found, enter correct email",
      });
    }
});


const resendverificationMail = asyncHandler(async (req:any,res:any) => {
  const {username} = req.body;
  const resendmailuser = await User.findOne({username});
  
  if (resendmailuser) {
    if(resendmailuser.verified === false) {
    
        const _id = resendmailuser._id;
        const username = resendmailuser.username;
        const emailCode = resendmailuser.emailcode;
        const email = resendmailuser.email;

        re_sendverificationMail(_id,username,emailCode,email,res);

      }else {
        res.json({
          _id: resendmailuser._id,
          username: resendmailuser.username,
          email: resendmailuser.email,
          pic: resendmailuser.pic,
          isAdmin: resendmailuser.isAdmin,
          token: generateToken(resendmailuser._id),
        });
      }
  } else {
    res.json({
      message: "User not found"
    });
  }
});

const openBet = asyncHandler(async (req:any,res:any) => {
  const match = req.body.matchparam.replace(/-/g, ' ')
  const betid = `${
      Math.floor(100000000 + Math.random() * 900000000)
  }`;
  const betAmt =req.body.betAmount;
  const betPartipntscount = req.body.betParticipantsCount;
  const matchid = req.body.matchidparam;
  const user_Id = req.body.userId;
  const user_name = req.body.username;
  const prediction = req.body.betprediction;
  const bettingteam = req.body.bettingteam
  const remainparticipantscount = betPartipntscount - 1;

  const placebet = await Bets.create({
    betid: betid,
    betamount: betAmt,
    match: match,
    matchid: matchid,
    userId: user_Id,
    openedby: user_name,
    betcondition: {
      bettingteam: bettingteam,
      prediction: prediction
    },
    totalparticipantscount: betPartipntscount,
    participantscount: 1,
    participants: user_name,
    remainingparticipantscount: remainparticipantscount,
    betresult: null,
    betwinners: '',
    betlosers: '',
    betcreationstatus: 'openedbet',
    betstatus: 'open'
  })
  
  if (placebet) {
    const getuser = await User.findOne({userId: user_Id});

    if(getuser) {
      const betsopenedcount = getuser.betsopenedcount;
      betsopenedcount + 1;
      await User.updateOne({userId:user_Id},{$set: {betsopenedcount:betsopenedcount}})
    }

    res.json({
        _id: placebet._id,
        betid: placebet.betid,
        betamount: placebet.betamount,
        matchid: placebet.matchid,
        match: placebet.match,
        userId: placebet.userId,
        openedby: placebet.openedby,
        totalparticipantscount: placebet.totalparticipantscount,
        participantscount: placebet.participantscount,
        participants: placebet.particicpants,
        status: placebet.betstatus,
      });
  } else {
    res.json({
      message: "User not found"
    });
  }
});


module.exports = { checkloginEmail, openBet, getWalletAddress,getSponsor,updateWalletAddress,getReferrals,activateAccount,checkEmail, checkForgotEmail,checkUserName, authUser, updateUserProfile, registerUser, verifyUser, resendverificationMail, resetPassword, updateTransactionPin };
