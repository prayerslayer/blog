var express = require( 'express' ),
    app = express(),
    port = process.env.PORT || 4000;

// just serve the _site
app.use( express.static( __dirname + '/_site' ) );
app.listen( port );
console.log( 'running on', port );