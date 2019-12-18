const express = require( "express" );
const { Router } = express;
const {
  requestApproval,
  withdrawalRequest,
  // transferFund,
  getWithdrawalRequests,
  getWithdrawalRequest,
} = require( "../controller/withdraw" );
const requireLogin = require( "../config/auth" );

const router = Router();

router.get( "/request/:userId", requireLogin, getWithdrawalRequest );
router.get( "/request/:userId/:role", requireLogin, getWithdrawalRequests );
router.post( "/request/:userId/:role", withdrawalRequest );
router.put( "/request/approval/:userId/:agentId/:requestId", requestApproval );

module.exports = router;