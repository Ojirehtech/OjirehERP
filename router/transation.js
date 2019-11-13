const express = require( "express" );
const { Router } = express;
const {
  requestApproval,
  withdrawalRequest,
  transferFund,
  getRequests,
} = require( "../controller/transaction" );
const requireLogin = require( "../config/auth" );

const router = Router();

router.get( "/request/:userId/:role", requireLogin, getRequests );
router.post( "/request/:userId/:role", withdrawalRequest );
router.put( "/request/approval/:userId/:agentId/:requestId/:role", requestApproval );
router.put( "/request/transfer", requireLogin, transferFund );

module.exports = router;