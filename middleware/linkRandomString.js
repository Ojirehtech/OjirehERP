const randomstring = require("randomstring");

/**
   * This will return a unique and dynamic string using the provided parameters.
   * @param  {string} Name Name of the target object.
   * @param  {string} Id Id of the target object.
   * @returns {string} string
   */
exports.parseLink = ( username, id ) => {
  const formatedName = username
    ? username.toLowerCase()
      .replace( / /gi, "-" )
      .replace( /%/gi, "" )
    : null;
  const padding = `${ id }.${ randomstring.generate( 10 ) }`;
  const output = `${ formatedName }?_ref=${ padding }`;
  return output;
}
  

  /**
   * This will return an object of name & id from the Link parameter.
   * @param  {string} Link The custom link to decode.
   * @returns {string} string
   */
  static decode( Link ) {
    const arr = Link.split( "?_ref=" );
    const id = arr[ 1 ].split( "." )[ 0 ];
    return id;
  }
}

export default LinkManager;
