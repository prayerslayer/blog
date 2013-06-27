// important variables for creation
var svg = null,
	width = 1200,
	height = 1250,
	firstDraft = 1983,
	lastDraft = 2012;

// scales
var xScale = d3.scale.linear()
				.domain([ 0, 89 ])	// first 90 picks should do it
				.range([ 50, width ]),
	yScale = d3.scale.linear()
				.domain([ firstDraft, lastDraft ])	// years including drafts
				.range([ 1, lastDraft - firstDraft + 1 ]),
	opacity = d3.scale.linear()
				.domain([ 0, 1 ])
				.range([ 0, 1 ]),
	color = d3.scale.linear()
				.domain([ 0, 1, 50, 100, 150 ])
				.range([ "white", "lightgrey", "steelblue", "darkblue", "black" ])

// mouse over function sets infobox
var hover = function( ) {
	var data = d3.select( this ).datum();
	d3.select( "div.info .info-player" ).text( data.name );
	d3.select( "div.info .info-pick" ).text( data.pick + 1 );
	d3.select( "div.info .info-team" ).text( data.team );
	d3.select( "div.info .info-year" ).text( data.year );
	d3.select( "div.info .info-ws" ).text( data.ws || "?" );
	d3.select( "div.info .info-ws48" ).text( data.ws48 || "?");
};

// loads data of a given draft
var loadData = function( year, callback ) {
	d3.csv( "data/draft" + year + ".csv", function( row, i ) {
		return {
			"name": row.Player,
			"team": row.Tm,
			"college": row.College,
			"year": year,
			"pick": i,
			"ws": row.WS,
			"ws48": row.WS48
		};
	}, callback);
};

// displays draft
var showData = function( draft ) {
	// render player bars
	svg
		.selectAll( "rect" )
		.data( draft, function( d ) { return d.year + "-" + d.pick; })
		.enter()
		.append( "rect" )
			.attr( "class", "player" )
			.attr( "width", 10 )
			.attr( "height", 30 )
			.attr( "x", function( d ) { return xScale( d.pick ); })
			.attr( "y", function( d ) { return yScale( d.year ) * 40; })
			.attr( "opacity", function( d ) { return opacity( d.ws48*4 ); })
			.style( "fill", function( d ) { return color( d.ws ); })
			.on( "mouseover", hover);
				

	// render draft year
	var year = draft[0].year;
	svg
		.append( "text" )
			.attr( "x", 0 )
			.attr( "y", yScale( year + 1 ) * 40 - 15 )
			.text( year );
};

// draws lines between draft rounds
var drawLegend = function() {

	// between round 1 and 2
	svg
		.append( "line" )
			.attr( "class", "separator")
			.attr( "x1", xScale( 30 ) )
			.attr( "x2", xScale( 30 ) )
			.attr( "y1", 0 )
			.attr( "y2", height );

	// between round 2 and 3
	svg
		.append( "line" )
			.attr( "class", "separator")
			.attr( "x1", xScale( 60 ) )
			.attr( "x2", xScale( 60 ) )
			.attr( "y1", 0 )
			.attr( "y2", height );

	// round headlines
	svg
		.append( "text" )
			.attr( "class", "round" )
			.attr( "x", xScale( 15 ) )
			.attr( "y", 20 )
			.text( "Round 1");
	svg
		.append( "text" )
			.attr( "class", "round" )
			.attr( "x", xScale( 45 ) )
			.attr( "y", 20 )
			.text( "Round 2");
	svg
		.append( "text" )
			.attr( "class", "round" )
			.attr( "x", xScale( 75 ) )
			.attr( "y", 20 )
			.text( "Round 3");
};

$( document ).ready( function() {
	svg = d3.select( "svg.visualization" );
	for ( var i = firstDraft; i <= lastDraft; i++ ) {
		loadData( i, showData );
	}
	drawLegend();
});

