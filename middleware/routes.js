const userRoutes = require( "../router/user" );
const error = require( "../config/error" );
const referRoutes = require( '../router/refer' );
const requestRoutes = require( "../router/transation" );
const roleRoutes = require( "../router/role" );
const transferRoutes = require( "../router/transfer" );

module.exports = ( app ) => {
  app.use( "/api/v1", userRoutes );
  app.use( "/api/v1", referRoutes );
  app.use( "/api/v1", requestRoutes );
  app.use( "/api/v1", roleRoutes );
  app.use( "/api/v1", transferRoutes );
  app.use( error );
}