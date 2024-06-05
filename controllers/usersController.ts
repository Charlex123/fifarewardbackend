export {};
const asyncHandler = require('express-async-handler');
const Users = require('../models/usersModel');
const generateUid = require("../utils/generateUid");

const addUpdateUser= asyncHandler(async (req: any, res: any) => {
  const { 
    username,
    address,
    sponsoraddress,
    issponsorinfluencer,
    isinfluencer,
    badge,
    pic
 } = req.body;
 if (address == sponsoraddress) {
    return res.json({ message: "You can't refer yourself" });
  }
  const user_ = await Users.findOne({address: address});
  
  if (!user_) {
    
    const user = new Users({ username: username, address: address, sponsoraddress: sponsoraddress,isinfluencer: isinfluencer, issponsorinfluencer: issponsorinfluencer, badge: badge, pic: pic });
    await user.save();
    res.status(200).json({ message: 'action success',user: user });
  }else {
    user_.username = username;
    user_.address = address;
    user_.sponsoraddress = sponsoraddress;
    user_.isinfluencer = isinfluencer;
    user_.issponsorinflencer = issponsorinfluencer;
    user_.badge = badge;
    user_.save();
    return res.json({ message: 'action success',user: user_ });
  }
  
});

const UpdateprofilePicture = asyncHandler(async (req:any,res:any) => {
  const { address, filePath_ } = req.body;
  const gUser = await Users.findOne({address: address});
  if (gUser) {
    gUser.verified = true;
    gUser.pic = filePath_;
    const found__User = await gUser.save();
    if(found__User) {
      const foundUser = await Users.updateOne(
        {address:address}, { $set: {pic: filePath_}});

      if(foundUser) {
        const foundUser_ = await Users.findOne({address: address});
        res.json({
          pic: foundUser_.pic,
        });
      }
    }
    } else {
      res.json({message: "User not found"});
    }
});

const UpdateUsername = asyncHandler(async (req:any,res:any) => {
  const { address, username } = req.body;
  const gUser = await Users.findOne({address: address});
  if (gUser) {
    gUser.verified = true;
    gUser.username = username;
    const found__User = await gUser.save();
    if(found__User) {
      const foundUser = await Users.updateOne(
        {address:address}, { $set: {username: username}});

      if(foundUser) {
        const foundUser_ = await Users.findOne({address: address});
        res.json({
          username: foundUser_.username,
        });
      }
    }
    } else {
      res.json({message: "User not found"});
    }
});

const UpdateReflinkId = asyncHandler(async (req:any,res:any) => {
  const { address, encrypted } = req.body;
  const gUser = await Users.findOne({address: address});
  if (gUser) {
    gUser.verified = true;
    gUser.encryptedreflinkid = encrypted;
    const found__User = await gUser.save();
    if(found__User) {
      const foundUser = await Users.updateOne(
        {address:address}, { $set: {encryptedreflinkid: encrypted}});

      if(foundUser) {
        const foundUser_ = await Users.findOne({address: address});
        res.json({
          encryptedreflinkid: foundUser_.encryptedreflinkid,
        });
      }
    }
    } else {
      res.json({message: "User not found"});
    }
});

const getUsers = asyncHandler(async (req:any, res:any) => {
  
  const users = await Users.find({}, 'address pic -_id'); // Select username and profilePic, exclude _id
  if(users) {
    res.json({
      data: users
    });
  }else {
    res.json({
      data: "Oops! something happened"
    })
  }
  
})

const getUser = asyncHandler(async (req: any, res: any) => {
    const {address} = req.body;    
    const user = await Users.findOne({address: address});
    res.status(200).json({ user });
});

module.exports = { addUpdateUser, getUser, UpdateprofilePicture, UpdateUsername, UpdateReflinkId, getUsers};
