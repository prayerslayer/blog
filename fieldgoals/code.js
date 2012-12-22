var made = 0, miss = 0, fgpct = 1.0;

function madeOne() {
	made += 1;
	calculateFG();
}

function missOne() {
	miss += 1;
	
	calculateFG();
}

function calculateFG() {
	//calculate
	if ( made + miss === 0 )
		fgpct = 0;
	else
		fgpct = ( made / (made + miss) );
	//show
	showStats();
	//save if available
	saveStats();
}

function showStats() {
	$( "#misscount" ).text( miss );
	$( "#madecount" ).text( made );
	$( "#percentage" ).text( ( fgpct * 100 ).toFixed( 2 ) + " %" );
}

function saveStats() {
	if ( localStorage ) {
		localStorage.setItem( "miss" , miss );
		localStorage.setItem( "made" , made );
	}
}

function loadStats() {
	if ( localStorage ) {
		miss = localStorage.getItem( "miss" );
		miss = typeof( miss ) === "undefined" ? 0 : parseInt( miss );
		made = localStorage.getItem( "made" );
		made = typeof( made ) === "undefined" ? 0 : parseInt( made );
	}
}

function reset() {
	made = 0;
	miss = 0;
	fgpct = 0;
	saveStats();
	showStats();
}

//TODO monospace font für zahlen

$( document ).ready( function () {

	loadStats();
	calculateFG();

	$( "#made" ).click( madeOne );
	$( "#miss" ).click( missOne );
	$( "#reset" ).click( reset );

	RandomFlickr.get( "basketball", function( photo ) {
		$( "body" ).css( "background-image", "url("+photo+")" );
	}, {
		"size": [ $("body").width(), $("body").height() ]
	});
});