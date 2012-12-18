if ( typeof initMap !== "undefined" ) { //returns true on /cv
	initMap();
}

var host = "//npiccolotto.com";

var header = document.getElementById( "header" );
header.addEventListener( "click", function() {
	window.location.replace( host );
}, false );