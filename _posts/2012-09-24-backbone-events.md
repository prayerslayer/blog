---
layout: singlepost
title: "Backbone.js Events triggern gleichzeitig"
keywords: "backbone, events, firing, feuern, trigger, gleichzeitig, all, at the same time, at once"
---

Eure Backbone.js Events triggern alle gleichzeitig und ihr wisst nicht, warum? Habt ihr eine Collection von Models, die gerendert werden soll und sieht euer Code ungefähr so aus?

# Markup

    <html>
    	<head> ... </head>
    	<body>
    		<div id="id">
    			<!-- hier soll die collection rein -->
    		</div> 
    	</body>
    </html>
{:lang="html"}

# Code

    // Ein MyView, der das Model rendert. ZB einen Track in einer Playliste.
    MyView = Backbone.View.extend({
    	template: _.template( $( "#child_template" ).html() ),  // das Template
    	render: function() {
    		var mod = this.model.toJSON();  // JS object des Models erstellen
    		var html = this.template( mod );  // In Template überführen
    		$( this.el ).append( html );  // Template an Element dranhängen
    		return this;
    	},
    	events: {
    		"click .mybutton": "doSomething"
    	},
    	doSomething: function( ){
    		alert("HUP HUP");
    	}
	});

	// So erstellt ihr den MyView

	_.each( data, function( singledata ) {
		var mymodel = new MyModel( singledata );  // MyModel ist das Model
		var myview = new MyView({
			model: mymodel,
			el: $( "#id" )  // die Collection soll ja in dieses div gerendert werden
		});
		mycollection.add( mymodel );
	});
{:lang="javascript"}

# Verhalten

Ein Klick auf ein Element mit der Klasse *mybutton* triggert den Eventhandler für **alle** Views anstatt für einen.

# Auflösung

Die Events in Backbone werden an ein Element im DOM gebunden. Das heißt:
	
1. Das DOM Element muss (im DOM) existieren, damit überhaupt Events getriggert werden.
2. Teilen sich mehrere Views dasselbe DOM Element, wird ein Event unter Umständen mehr als einmal getriggert. Kommt auf den CSS Selector an.

Punkt 1 passt in eurem Code, das Element *div#id* existiert von Anfang an und die Events werden ja auch getriggert. Punkt 2 allerdings ist das Problem. Vereinfacht gesagt sucht Backbone nach Elementen, sobald ein Event getriggert wird. In eurem Fall verwendet es dabei den CSS Selector *.mybutton*. Die Suche startet beim angegebenen *el*, welches bei euren Views dasselbe ist. Backbone findet also Repräsentationen aller Views anstatt nur eine und triggert den Eventhandler entsprechend oft.

    // Die Suche nach .mybutton ab div#id findet alle Bilder
    <div id="#id">
    	<div id="1" class="child">
    		<img class="mybutton" />
    	</div>
    	<div id="2" class="child">
    		<img class="mybutton" />
    	</div>
    	<div id="3" class="child">
    		<img class="mybutton" />
    	</div>
    </div>
{:lang="html"}

Ihr könntet jetzt natürlich die ID eures Models in den CSS Selector der Events einbauen, das würde helfen. Lieber nicht machen und weiterlesen!

# Verbesserung

Eine elegantere Variante, die auch im [Todo.js Tutorial](http://documentcloud.github.com/backbone/docs/todos.html) verwendet wird, ist einen View für die Collection zu erstellen und dort die einzelnen Model-Views zu verwalten.

    CollectionView = Backbone.View.extend({
    	initialize: function() {
    		this.model.bind( "add", this.modelAdd, this);
    		this.render();
    	},
    	render: function() {
    		//...
    	},
    	modelAdd: function( mymodel ) {
    		var myview = new MyView({
    			model: mymodel  // WICHTIG: Kein el mehr angeben, dann erzeugt Backbone selbst eines (default: <div></div>)
			});
			$( this.el ).append( myview.render().el );  // erzeugtes Element anhängen
    	}
	});

	myCollectionView = new CollectionView({
		model: mycollection,
		el: $( "id" )  // Hier ist euer el
	});

	// So wird alles gerendert

	_.each( data, function( singledata) {
		var mymodel = new MyModel( singledata );
		mycollection.add( mymodel );
	});
{:lang="javascript"}

Beim *mycollection.add* wird die *modelAdd* Funktion im View der Collection ausgeführt und das neue Model automatisch gerendert. Die Events werden wie gewünscht getriggert, da jeder View sein eigenes "Root Element" hat. Problem gelöst und der Code sieht auch noch schöner aus als vorher.