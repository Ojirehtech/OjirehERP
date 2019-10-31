const express = require( "express" );
const { Router } = express;
const { createRole } = require( "../controller/role" );
const requireLogin = require( "../config/auth" );

const router = Router();

router.put( "/role/:userId/:adminId/:role", requireLogin, createRole );

module.exports = router;