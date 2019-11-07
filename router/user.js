const express = require( "express" );
const upload = require( "../middleware/fileupload" );
const {
  signIn,
  signup,
  Signout,
  deleteUser,
  updateUserInfo,
  fetchUser,
  fetchUsers,
  uploadPhoto,
  photo,
  cardBought,
  generateOTP
} = require( "../controller/user" );
const requireLogin = require( "../config/auth" );

const router = express.Router();

router.post( "/signup", signup );
router.post( "/login", signIn );
router.get( "/signout", signup );
router.get( "/users", requireLogin, fetchUsers );
router.get( "/user/:userId", requireLogin, fetchUser );
router.put( "/user/card/:userId", requireLogin, cardBought );
router.post( "/user/otp/:userId", generateOTP );
router.get( "/profile/photo/:userId", photo );
router.put( "/profile/upload/:userId", upload.single("photo"), uploadPhoto );
router.put( "/user/update/:userId", requireLogin, updateUserInfo );
router.delete( "/user/:userId", requireLogin, deleteUser );

module.exports = router;