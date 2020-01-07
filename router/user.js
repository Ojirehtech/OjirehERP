const express = require( "express" );
const upload = require( "../middleware/fileupload" );
const {
  signIn,
  signup,
  deleteUser,
  fetchUser,
  fetchUsers,
  uploadPhoto,
  photo,
  cardBought,
  generateOTP,
  signout,
  userByParentId,
  setParentId,
  otpVerification,
  generateLoanOTP,
  dataUpload,
  adminSignIn,
  adminsignup,
  updateUser,
  awardBonus,
  searchUser,
} = require( "../controller/user" );
const requireLogin = require( "../config/auth" );

const router = express.Router();

router.post( "/signup", signup );
router.post( "/login", signIn );
router.get( "/signout", signout );
router.get( "/users/search", requireLogin, searchUser );
router.get( "/users", fetchUsers );
router.post( "/admin/signup", adminsignup );
router.post( "/admin/signin", adminSignIn );
router.post( "/users/data_upload", dataUpload );
router.put( "/user/:userId", requireLogin, updateUser );
router.get( "/user/:userId", requireLogin, fetchUser );
// router.put( "/user/bonus/:userId", requireLogin, awardBonus );
router.put( "/user/card/:userId", requireLogin, cardBought );
router.post( "/user/otp/:phone", generateOTP );
// router.post( "/user/generate/:userId/:phone", requireLogin, generateLoanOTP );
// router.post( "/user/verifyotp/:otp", requireLogin, otpVerification );
router.put( "/user/parentId/:userId/:refererPhone", requireLogin, setParentId );
router.get( "/user/network/:userId", requireLogin, userByParentId );
router.get( "/profile/photo/:userId", photo );
router.put( "/profile/upload/:userId", upload.single("photo"), uploadPhoto );
router.delete( "/user/delete/:userId", requireLogin, deleteUser );

module.exports = router;