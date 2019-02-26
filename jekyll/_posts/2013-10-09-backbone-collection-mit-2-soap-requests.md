---
title: "Backbone Collection mit 2 SOAP Requests"
layout: singlepost
---

Bei meiner Diplomarbeit arbeite ich teilweise mit einem bereits bestehenden [SOAP](http://en.wikipedia.org/wiki/SOAP) Interface. [Backbone](http://backbonejs.org) hatte ich mir schon für das Frontend ausgesucht und plötzlich war ich in der Situation, dass eine Backbone Collection zwei separate SOAP Requests durchführen sollte. Einmal brauchte ich den Pfad zu einem ``source`` Bild und einmal zu einem ``target`` Bild. Jetzt ist das Standardverhalten der Collections, **einen** Request an eine **REST** API zu schicken, aber glücklicherweise kann man Teile von Backbone überschreiben, wie es einem passt.

Zuerst lege ich bei der Initialisierung Parameter für einen derartigen AJAX Request fest, die später einfach kopiert und übernommen werden können.

~~~ javascript
this.standard_params = {
	"type": "POST", // soap = post
	"url": options.url,
	"dataType": "xml",
	"contentType": "application/soap+xml"
}
~~~

Die ``parse()`` Methode wandelt das erhaltene SOAP XML in JSON zur Weiterverarbeitung um.

~~~ javascript
parse: function( xml ) {
	var obj = {
		/* xml daten hier rein */
	};

	return obj;
}
~~~

Der wichtigste Teil ist aber die ``sync()`` Methode der Collection zu überschreiben. Dabei wird für jeden Request mit ``Backbone.ajax()`` ein Promise erstellt, diese mit ``$.when()`` zusammengefasst und zurückgegeben. Wichtig ist außerdem das ``request`` Event des Models auszulösen, da ansonsten keine Weiterverarbeitung stattfindet (also kein Aufruf von ``.parse()``).

~~~ javascript
sync: function( method, model, opts ) {
	if ( method === "read" ) {
		// "read" wird bei collection.fetch() übergeben

		// === source request === 

		// zuerst parameter klonen
		var source_params = _.clone( this.standard_params );

		// xml reqest bauen, also envelope und body
		source_params.data = this._buildXML( /*data*/ );

		// xhr für den request erstellen
		var source_xhr = Backbone.ajax( _.extend( source_params, opts ) );

		// ===  selbes spiel mit target request === 

		// jQuery Deferred für die beiden requests erstellen
		var both_xhr = $.when( source_xhr, target_xhr );
		
		// request event triggern, da ansonsten zb kein parse() aufgerufen wird
		model.trigger( "request", model, both_xhr, opts );
		
		// Deferred zurückgeben
		return both_xhr;
	}
}
~~~

Die Collection würde man jetzt ganz normal erstellen.

~~~ javascript
var collection = new MyCollection([], { /* notwendige daten für requests */ });
~~~

Allerdings wird die ``parse()`` Methode für beide Requests separat aufgerufen, was ein Problem darstellt, wenn alle Daten am Ende in der Collection landen sollen. Deswegen muss man Backbone beim ``fetch()`` explizit dazusagen, dass nichts gemerged oder gelöscht werden soll. Der Callback kommt dann bequem mit ``Deferred.then()``.

~~~ javascript
panels.fetch({
	"merge": false,
	"remove": false
}).then( function() {
	// auf neue daten reagieren
});
~~~

Ich denke, das Konzept lässt sich auch für ``n > 2`` Requests generalisieren.