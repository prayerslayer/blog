$( document ).ready( function() {
	if ( typeof initMap !== "undefined" ) { //returns true on /cv
		initMap();
	}

	$( ".social" )
		.tooltip({
			"placement": "bottom"
		});

	var host = "//nikolaus-piccolotto.info";
	$( "header" ).click(function() {
		window.location.replace( host );
	});
	
});