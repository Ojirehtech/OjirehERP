const express = require( "express" );
const {
  repayLoan,
  loanRequest,
  loanByUser,
  allLoan,
} = require( "../controller/loan" );

const requireLogin = require( "../config/auth" );

const router = express.Router();

router.post( "/loan/:userId", requireLogin, loanRequest );
router.get( "/loans/:userId/:role", requireLogin, allLoan );
router.get( "/loan/:role/:userId", loanByUser );
router.put( "/loan/:userId/:loanId", requireLogin, repayLoan );

module.exports = router;