export {};
const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    isConnected: {
      type: Boolean
    },
    encryptedreflinkid: {
      type: String
    },
    sponsoraddress: {
      type: String
    },
    isinfluencer: {
      type: Boolean
    },
    issponsorinfluencer: {
      type: Boolean
    },
    badge: {
      type: String
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    Date: {
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", usersSchema);

module.exports = Users;

