const express = require( "express" );
const {
  refer,
  refererSettlement,
  updateParentId
} = require( "../controller/refer" );
const router = express.Router();

router.get( "/ojirehprime/agent/:userId", refer );
router.put( "/refer/:userId/:role/:parentId", updateParentId );
router.put( "/refer/:parentId", refererSettlement );

module.exports = router;