---
title: "Mock API in 5 Zeilen"
layout: singlepost
---

[Sinon.js](http://sinonjs.org) ist sehr praktisch um während eine API während des Entwicklungsprozesses einer Anwendung zu simulieren. Es kann auch noch mehr, in diverse Testframeworks (QUnit etc.) integriert werden und und und. Ich habs erstmal nur für eine Fake API verwendet:

~~~ html
<script src="sinon.js"></script>
~~~

~~~ javascript
// create fake server
var fake_server = sinon.fakeServer.create();
// it should respond automatically
fake_server.autoRespond = true;
// after 500 ms
fake_server.autoRespondAfter = 500;

fake_server.respondWith( /data/, function( xhr ) {
	// respond takes arguments:
	// ( status code, headers, response data);
	xhr.respond( 200 );
});
~~~

Das Argument ``/data/`` ist eine Regex. Sobald irgendwo ein XMLHttpRequest unterwegs ist, dessen Zieladresse diese Regex matcht, wird die angegebene Funktion ausgeführt. In diesem Fall also etwa Anfragen der Art ``$.get( "data", function( data ) {} )``.