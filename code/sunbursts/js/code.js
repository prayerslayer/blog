if (typeof(console)=="undefined" || console==null) {
	console = new Object();
	console.log = function() {};
}

var vis;
var stroke_color = "#E9EBD4";

$(document).ready(function() {
	$("#showButton").click(function(evt) {
		var d = $("#depth").attr("value");
		var b = $("#breadth").attr("value");
		if (d == null || b == null || d.length==0 || b.length==0) {
			alert("Please enter some positive values.");
			return;
		}
		if (d <0 || b < 0) {
			alert("You think you're smart, huh?");
			return;
		}
		var di, bi;
		try {
			di = parseInt(d);
			bi = parseInt(b);
		}
		catch(ex) {
			alert("Fehler beim Konvertieren");
			return;
		}
		$("#chart_one").html("");
		var w = $("#chart_one").width();
		var h = $("#chart_one").height();
		//di+1 weil meine addVisData die Wurzel als Höhe 1 rechnet
		var formatierung = d3.format(",");
		//$("#count").text("Worst case: "+formatierung(calcCount(bi,di+1))+" Konzepte.");
		showVis(w,h,bi,di+1);
	});
});

function calcCount(breadth, depth) {
	var i = depth;
	var sum = 0;
	while (i>0) {
		sum += Math.pow(breadth, i);
		i--;
	}
	return sum;
}

function returnRandom( min, max ) {
	if( min > max ) {
		return( -1 );
	}
	if( min == max ) {
		return( min );
	}
	return( min + parseInt( Math.random() * ( max-min+1 ) ) );
}

function createTestnode(depth, breadth) {
	//check if recursion needs to end
	if (depth<=0)
		return;
	// console.log("nodes: "+total_nodes);
	// console.log("depth: "+depth);
	// console.log("breadth: "+breadth);
	//generate random name
	var node = {};
	node.name = String.fromCharCode(returnRandom(65,65+26),returnRandom(65,65+26),returnRandom(65,65+26));
	node.size = Math.floor(Math.random()*Math.floor(Math.random()*(1+3)+1)*1000);
	if (depth>1) {
		node.children = new Array();
		var rand = Math.random()*10;
		var count = rand > breadth ? breadth : rand;
		for(var i=0;i<count;i++) {
			node.children.push(createTestnode(depth-1, breadth));
		}
	}
	return node;
}

function addVisData(node, conf) {
	if (node==null || conf == null)
		return;
	console.log(node);
	console.log(conf);
	node.innerRadius = conf.innerRadius;
	node.outerRadius = conf.outerRadius;
	node.startAngle = conf.startAngle;
	node.endAngle = conf.endAngle;
	node.color = conf.randomColor[node.depth%2];
	if (node.children==null || node.children.length==0)
		return;
	console.log("children ahead");
	var i = 0;
	var childcount = node.children.length;
	var angle = (conf.endAngle-conf.startAngle)/childcount;
	while (i<childcount) {
		var child = node.children[i];
		//calculate outer radius so that surface area equals size
		var area = conf.area/childcount+child.size;
		var radius = Math.sqrt(2*area/angle)-conf.outerRadius;
		var new_conf = {
			"randomColor": conf.randomColor,
			"innerRadius": child.parent!=null ? child.parent.outerRadius+3 : conf.outerRadius+3,
			"outerRadius": child.parent.outerRadius+3+radius,
			"startAngle": i*angle+conf.startAngle,
			"area": area,
			"endAngle": (i+1)*angle+conf.startAngle
		};
		addVisData(node.children[i], new_conf);
		i++;
	}
}

function showVis(w,h,b,d) {
	//generate testdata
	var testdata_a = new Object();
	
	testdata_a = createTestnode(d,b);
	
	var r=Math.min(w,h)/2,
		color=d3.scale.category20c();
	vis = d3.select("#chart_one").append("svg:svg")
				.attr("width", w)
				.attr("height", h)
				.append("svg:g")
				.attr("transform", "translate("+w/2+","+h/2+")");

	//calc first radius
	var outer_r = Math.sqrt(testdata_a.size/Math.PI);
	var randColor = d3.rgb(returnRandom(30,225),returnRandom(30,225),returnRandom(30,225));
	var initConf = {
		"randomColor": [randColor,d3.rgb(255-randColor.r,255-randColor.g,255-randColor.b)],
		"innerRadius": 0,
		"outerRadius": outer_r,
		"startAngle": 0,
		"area": testdata_a.size,
		"endAngle": 2*Math.PI
	};
	
	var arc  = d3.svg.arc()
		.innerRadius(function(d) {return d.innerRadius;})
		.outerRadius(function(d) {return d.outerRadius;})
		.startAngle(function(d) {return d.startAngle;})
		.endAngle(function(d) {return d.endAngle;});
	
	var tree = d3.layout.tree()
				.size([w,h])
				.separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });
	var nodes = tree.nodes(testdata_a);
	addVisData(testdata_a, initConf);
	console.log(nodes);
	var node = vis.selectAll("g.node")
				.data(nodes)
				.enter()
					.append("svg:path")
					.attr("d", arc)
					.attr("fill", function(d) {return d.color;})
					.attr("stroke", stroke_color)
					.attr("class", "node");
	//mouse over für arcs einführen
	var old_color;
	var root = d3.select(".node");
	d3.selectAll(".node")
		.on("mouseover", function(d,i) {
			var dis = d3.select(this);
			if (dis.node()==root.node())
				dis.attr("cursor", "move");
			old_color = d3.rgb(dis.attr("fill"));
			dis.attr("fill", old_color.brighter());
			dis.attr("stroke", "white");
			$("#size").text("Value: "+d.size);
		})
		.on("mouseout", function(d,i) {
			var dis = d3.select(this);
			if (dis==root)
				dis.attr("cursor", "default");
			dis.attr("fill", old_color);
			dis.attr("stroke", stroke_color);
			$("#size").text("");
		});
	
	var scale = 1;
	var x=w/2,y=h/2;
	var zoomVis = function() {
		if (d3.event.wheelDeltaY) {
			if (d3.event.wheelDeltaY<d3.event.wheelDeltaX)
				scale -= 0.1;
			else
				scale += 0.1;
			if (scale < 0.1)
				scale = 0.1;
			vis.attr("transform", "translate("+x+","+y+")scale("+scale+","+scale+")");
		}
		else if (d3.event.detail) {
			console.log(d3.event);
			if (d3.event.detail < 0)
				scale += 0.1;
			else
				scale -= 0.1;
			if (scale < 0.1)
				scale = 0.1;
			vis.attr("transform", "translate("+x+","+y+")scale("+scale+","+scale+")");
		}
	};
		
	d3.select("svg")
		.on("mousewheel", zoomVis)
		.on("DOMMouseScroll.zoom", zoomVis);
	//dnd
	var drag = false;
	vis.on("mousedown", function() {
		drag = true;
		vis.attr("cursor", "move");
	});
	vis.on("mousemove", function() {
		if(drag) {
			d3.event.preventDefault();
			x = d3.event.layerX;
			y = d3.event.layerY;
			vis.attr("transform", "translate("+x+","+y+")scale("+scale+","+scale+")");
		}
	});
	vis.on("mouseup", function() {
		if (drag) {
			x = d3.event.layerX;
			y = d3.event.layerY;
			vis.attr("transform", "translate("+x+","+y+")scale("+scale+","+scale+")");
			drag = false;
			vis.attr("cursor", "default");
		}
	});
}