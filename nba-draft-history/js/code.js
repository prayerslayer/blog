// important variables for creation
var svg = null,
	width = 1200,
	height = 1250,
	mvps = null,
	firstDraft = 1983,
	lastDraft = 2012;

// scales
var xScale = d3.scale.linear()
				.domain([ 0, 90 ])	// first 90 picks should do it
				.range([ 50, width ]),
	yScale = d3.scale.linear()
				.domain([ firstDraft, lastDraft ])	// years including drafts
				.range([ 1, lastDraft - firstDraft ]),
	opacity = d3.scale.linear()
				.domain([ 0, 1 ])
				.range([ 0, 1 ]),
	color = d3.scale.linear()
				.domain([ 0, 1, 150 ])
				.range([ "white", "#ddd", "black" ])

// mouse over function sets infobox
var hover = function( ) {
	var data = d3.select( this ).datum();
	d3.select( "div.info .info-player" ).text( data.name );
	d3.select( "div.info .info-pick" ).text( data.pick + 1 );
	d3.select( "div.info .info-team" ).text( data.team );
	d3.select( "div.info .info-year" ).text( data.year );
	d3.select( "div.info .info-ws" ).text( data.ws || "?" );
};

// loads data of a given draft
var loadDraft = function( year, callback ) {
	d3.csv( "data/draft" + year + ".csv", function( row, i ) {
		return {
			"name": row.Player,
			"team": row.Tm,
			"college": row.College,
			"year": year,
			"pick": i,
			"ws": row.WS
		};
	}, callback);
};

// displays draft
var showDraft = function( draft ) {
	// render player bars
	svg
		.selectAll( "rect" )
		.data( draft, function( d ) { return d.year + "-" + d.pick; })
		.enter()
		.append( "rect" )
			.attr( "class", "player" )
			.classed( "mvp", function( d ) { return mvps[d.name]!=null; })
			.attr( "width", 10 )
			.attr( "height", 30 )
			.attr( "x", function( d ) { return xScale( d.pick ); })
			.attr( "y", function( d ) { return yScale( d.year ) * 40; })
			.style( "fill", function( d ) { return color( d.ws ); })
			.on( "mouseover", hover);
				

	// render draft year
	var year = draft[0].year;
	svg
		.append( "text" )
			.attr( "x", 0 )
			.attr( "y", yScale( year + 1 ) * 40 - 9 )
			.text( year );
};

var loadMVP = function() {
	var defer = jQuery.Deferred();
	d3.csv( "data/mvps.csv", function( row, i ) {
		return {
			"name": row.Player
		};
	}, function( data ) {
		var mvplist = {};
		for ( var i = 0; i < data.length; i++ ) {
			if (mvplist[data[i].name]) {
				mvplist[data[i].name] += 1;
			} else {
				mvplist[data[i].name] = 1;
			}
		}
		mvps = mvplist;
		defer.resolve( mvplist );
	});
	return defer.promise();
};

var highlightMVP = function( show ) {
	if ( show ) {
		svg
		.selectAll( "rect.player.mvp" )
			.transition()
			.duration( 200 )
			.style( "fill", "orange" );
	} else {
		svg
			.selectAll( "rect.player.mvp" )
			.transition()
			.duration( 200 )
			.style( "fill", function( d ) { return color( d.ws ); });
	}
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
			.attr( "x", xScale( 13 ) )
			.attr( "y", 20 )
			.text( "Round 1");
	svg
		.append( "text" )
			.attr( "class", "round" )
			.attr( "x", xScale( 43 ) )
			.attr( "y", 20 )
			.text( "Round 2");
	svg
		.append( "text" )
			.attr( "class", "round" )
			.attr( "x", xScale( 73 ) )
			.attr( "y", 20 )
			.text( "Round 3");
};

$( document ).ready( function() {
	svg = d3.select( "svg.visualization" );
	loadMVP().then( function( mvplist ) {
		for ( var i = firstDraft; i <= lastDraft; i++ ) {
			loadDraft( i, showDraft );
		}
		drawLegend();

		$( "input" ).change( function() {
			highlightMVP( $(this).is(":checked" ) );
		} );
	});
});

