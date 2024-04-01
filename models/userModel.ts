export {};
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: true,
      unique: true
    },
    sponsorId: {
      type: Number,
      required: false
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "referrals"
    },
    password: {
      type: String,
      required: true
    },
    isinfluencer: {
      type: Boolean
    },
    badge: {
      type: String,
      required: true
    },
    tpin: {
      type: Number,
      required: true
    },
    betsopenedcount: {
      type: Number,
      default: 0
    },
    betsjoinedcount: {
      type: Number,
      default: 0
    },
    nfts: {
      type: String,
      default: null
    },
    nftscount: {
      type: Number,
      default: 0
    },
    emailcode: {
      type: Number,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    status: {
      type: String,
      required: true
    },
    activated: {
      type: Boolean,
      default: false
    },
    walletaddress: {
      type: String,
    },
    bscwalletaddress2: {
      type: String,
    },
    bscwalletaddress: {
      type: String
    },
    bscwalletprivatekey: {
      type: String
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword:any) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (this:any,next:any) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("users", userSchema);

module.exports = User;
