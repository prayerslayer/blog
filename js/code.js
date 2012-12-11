if ( typeof initMap !== "undefined" ) { //returns true on /cv
	initMap();
}

var host = "//nikolaus-piccolotto.info";

var header = document.getElementById( "header" );
header.addEventListener( "click", function() {
	window.location.replace( host );
}, false );