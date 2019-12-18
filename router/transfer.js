const express = require( "express" );
const requireLogin = require( "../config/auth" );
const {
  makeTransfer,
  getTransfers,
  approveTransfer,
  getTransferByUser,
} = require( "../controller/transfer" );

const router = express.Router();

router.get( "/transfer/all", requireLogin, getTransfers );
router.post( "/transfer/:userId", requireLogin, makeTransfer );
router.get( "/transfer/all/:userId", requireLogin, getTransferByUser );
router.put( "/transfer/:transferId/:role", requireLogin, approveTransfer );

module.exports = router;
