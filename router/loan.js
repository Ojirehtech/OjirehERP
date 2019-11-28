const express = require( "express" );
const {
  repayLoan,
  loanRequest,
  loanByUser,
  allLoan,
} = require( "../controller/loan" );

const requireLogin = require( "../config/auth" );

const router = express.Router();

router.post( "/loan/:userId", loanRequest );
router.get( "/loans/:userId/:role", allLoan );
router.get( "/loan/:role/:userId", loanByUser );
router.put( "/loan/:userId/:loanId/:accountId", repayLoan );

module.exports = router;