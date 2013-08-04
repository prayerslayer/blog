---
layout: singlepost
title: "PhantomJS' page.evaluate()"
---

[PhantomJS](http://phantomjs.org/) ist ein Webkit-basierter Headless Browser, also ein Browser ohne GUI. Damit kann man verschiedene Sachen machen, zum Beispiel Ladezeiten aufnehmen oder Tests automatisieren. Um eine Funktion im Kontext einer geladenen Seite auszuführen, wird ``page.evaluate()`` benutzt.

Dabei gibt es etwas wichtiges zu beachten, was ich gestern nur mühsam herausfand: ``evaluate()`` wandelt die angegebene Funktion [in einen String](https://github.com/ariya/phantomjs/blob/master/src/modules/webpage.js#L350) um, bevor es sie ausführt. ``evaluate()`` hat keinen Zugriff auf Daten außerhalb des Seitenkontexts und dieses Verhalten ist ein Hackaround, damit Variablen übergeben werden können. Das bedeutet leider, dass auch keine Closures vorhanden sind. Verschiedene Skripte in die geladene Seite zu inkludieren, nach der Reihe, eins nach dem anderen, wird so schwierig. Callback Hell ahoi!

Noch mal zur Zusammenfassung, das hier funktioniert:

~~~ javascript
page.evaluate( function() {
	return document.getElementById('foo').textContent;
});
~~~

Das hier nicht:

~~~ javascript
var getText = function getText( id ) {
	return document.getElementById( id ).textContent;
}

page.evaluate( getText( 'foo' ) );
~~~

Weil es so aussehen muss:

~~~ javascript
page.evaluate( function( id ) {
	return document.getElementById( id ).textContent;
}, 'foo');
~~~

Closures funktionieren auch nicht:

~~~ javascript
var id = "main";
var text = page.evaluate( function() {
	return document.getElementById( id ).textContent;
});
~~~

Was schon gar nicht funktioniert:

~~~ javascript
// include css
var load = function load( url ) {
	var defer = jQuery.Deferred();
	page.evaluate( function() {
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = url;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(link);
		defer.resolve();
	});
	return defer.promise();
}
var load_funcs = [];
$.each( urls, function( url ) {
	load_funcs.push( load( url ) );
});
$.when( load_funcs ).then( function() {
	// all css included!
});
~~~