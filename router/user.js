const express = require( "express" );
const {
  signIn,
  signup,
  Signout,
  deleteUser,
  updateUserInfo,
  fetchUser,
  fetchUsers
} = require( "../controller/user" );
const requireLogin = require( "../config/auth" );

const router = express.Router();

router.post( "/signup", signup );
router.post( "/login", signIn );
router.get( "/signout", signup );
router.get( "/users", requireLogin, fetchUsers );
router.get( "/user/:userId", requireLogin, fetchUser );
router.put( "/user/update/:userId", requireLogin, updateUserInfo );
router.delete( "/user/:userId", requireLogin, deleteUser );


module.exports = router;