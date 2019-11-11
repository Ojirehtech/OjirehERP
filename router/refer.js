const express = require( "express" );
const {
  refer,
  refererSettlement,
} = require( "../controller/refer" );
const requireLogin = require( "../config/auth" );
const router = express.Router();

router.get( "/ojirehprime/agent/:userId", refer );
router.put( "/refer/:refererPhone", refererSettlement );

module.exports = router;