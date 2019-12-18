const express = require( "express" );
const requireLogin = require( "../config/auth" );
const { makeTransfer, getTransfers, approveTransfer } = require( "../controller/transfer" );

const router = express.Router();
router.post( "/transfer", requireLogin, makeTransfer );
router.get( "/transfer", getTransfers );
router.put( "/transfer/:transferId/:role", approveTransfer );

module.exports = router;
