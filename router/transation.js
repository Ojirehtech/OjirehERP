const express = require( "express" );
const { Router } = express;
const { requestApproval, withdrawalRequest } = require( "../controller/transaction" );
const requireLogin = require( "../config/auth" );

const router = Router();

router.put( "/request/:userId/:role", withdrawalRequest )
router.put( "/request/approval/:userId/:agentId/:requestId/:role", requestApproval );
module.exports = router;