const express = require( "express" );
const requireLogin = require( "../config/auth" );
const { getTransfers, finalize } = require( "../controller/transfer" );

const router = express.Router();

router.get( "/transfer", getTransfers );
router.put( "/transfer/:transferId", finalize );

module.exports = router;
