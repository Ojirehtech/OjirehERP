const express = require( "express" );
const {
  refer,
  refererSettlement,
  updateParentId
} = require( "../controller/refer" );
const requireLogin = require( "../config/auth" );
const router = express.Router();

router.get( "/ojirehprime/agent/:userId", refer );
router.put( "/refer/:userId/:refererPhone", updateParentId );
router.put( "/refer/:refererPhone", refererSettlement );

module.exports = router;