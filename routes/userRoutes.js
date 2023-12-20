const express = require("express");
const {
  authUser,
  registerUser,
  resendverificationMail,
  updateUserProfile,
  verifyUser,
  addAssets,
  assetDetails,
  updateTransactionPin,
  updateAssetWithdrawalStatus,
  resetPassword,
  checkEmail,
  checkUserName,
  activateAccount,
  checkForgotEmail,
  getReferrals,
  updateWalletAddress,
  getSponsor,
  getWalletAddress
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

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
router.post("/addfunds", addAssets);
router.post("/assetdetails", assetDetails);
router.get("/assetdetails/:id", assetDetails);
router.post("/updatetransactionpin", updateTransactionPin);
router.post("/updateassetwithdrawalstatus", updateAssetWithdrawalStatus);
router.post("/signin", authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
