export {};
const express = require("express");
const {
  checkloginEmail,
  openBet,
  authUser,
  registerUser,
  resendverificationMail,
  updateUserProfile,
  verifyUser,
  updateTransactionPin,
  resetPassword,
  checkEmail,
  checkUserName,
  activateAccount,
  checkForgotEmail,
  getReferrals,
  updateWalletAddress,
  getSponsor,
  getWalletAddress
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/checkloginemail", checkloginEmail);
router.post("/openbet", openBet);
router.post("/register", registerUser);
router.post("/verify", verifyUser);
router.post("/getsponsorwalletaddress", getSponsor);
router.post("/updatewalletaddress", updateWalletAddress);
router.post("/getwalletaddress", getWalletAddress);
router.get("/getreferrals/:sponsorId", getReferrals);
router.get("/activateaccount/:username/:emailcode/:uuid", activateAccount);
router.post("/checkemail", checkEmail);
router.post("/checkforgotemail", checkForgotEmail);
router.post("/checkusername", checkUserName);
router.post("/resendverifyemail", resendverificationMail);
router.post("/resetpassword", resetPassword);
router.post("/updatetransactionpin", updateTransactionPin);
router.post("/signin", authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
