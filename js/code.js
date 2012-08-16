$( document ).ready( function() {
	if ( initMap ) { //returns true on /cv
		initMap();
	}

	$( ".social" )
		.tooltip({
			"placement": "bottom"
		});

	var host = "http://nikolaus-piccolotto.info";
	$( "img" ).hover(
		function() {
			$( this ).css("opacity", 0.7);
		},
		function() {
			$( this ).css("opacity", 1);
		}
	);
	$( "header" ).click(function() {
		window.location.replace( host );
	});
	
});