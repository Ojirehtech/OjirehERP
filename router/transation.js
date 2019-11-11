const express = require( "express" );
const { Router } = express;
const { requestApproval, withdrawalRequest, transferFund } = require( "../controller/transaction" );
const requireLogin = require( "../config/auth" );

const router = Router();

router.put( "/request/:userId/:role", withdrawalRequest )
router.put( "/request/approval/:userId/:agentId/:requestId/:role", requestApproval );
router.put( "/request/transfer", transferFund );
module.exports = router;