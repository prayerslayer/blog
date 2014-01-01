var host = "//npiccolotto.com",
	header = document.getElementById( "header" ),
	redirect = function() {
		window.location.href = host;
	};

if ( header.addEventListener ) {
	// W3C DOM
	header.addEventListener( "click", redirect, false );
}
else if ( header.attachEvent ) {
	// IE DOM
	header.attachEvent( "onclick", redirect );
}
else {
	// No much to do
	header[ "click" ] = redirect;
}

