---
title: "Reihenfolge in foreman Procfile"
layout: singlepost
---

Eben hatte ich ein schräges Problem. Ich schreibe an einem node.js Server, der eine MongoDB und Redis angebunden hat. Die drei Prozesse verwalte ich mit [foreman](http://ddollar.github.io/foreman/) (Version 0.60.0). Dazu habe ich ein ``Procfile`` und eine Datei mit Konfigurationsvariablen erstellt:

~~~
# Procfile
mongo: mongod
redis: redis-server
web: nodemon app.js

# Env file
PORT=3000
~~~

Über die Reihenfolge habe ich mir erst nicht so viele Gedanken gemacht. Intuitiv ist der node Server am Ende gelandet, idealerweise Mongo und Redis zum Start schon laufen sollten. Der Server sollte natürlich auf den Port hören, welchen ich in der Konfiguration angegeben habe.

~~~ javascript
app.listen( process.env.PORT );
~~~

Tatsächlich hörte der Server dann aber immer auf PORT + 200. Gab ich 3000 an, lief er im Endeffekt auf 3200. Bei 3333 waren es 3533, bei 3200 3400 usw. Ursprünglich dachte ich, dass Redis oder Mongo sich zuvor schon Port 3000 gegriffen hatten, dem war aber nicht so.

Testweise startete ich Redis und Mongo nicht mehr. Voilá: Server läuft auf ``localhost:3000``. Sobald Redis exklusiv-oder Mongo aber wieder dabei waren, lief er auf 3100. Wurden alle drei gestartet, war es wieder Port 3200.

Das Problem? Ich habe keine Ahnung. Vielleicht ist es auch gar kein Bug, sondern Feature (trotzdem habe ich ein [Issue](https://github.com/ddollar/foreman/issues/392) auf Github aufgemacht). Die Lösung? Node zuerst starten:

~~~
# Procfile
web: nodemon app.js
mongo: mongod
redis: redis-server
~~~