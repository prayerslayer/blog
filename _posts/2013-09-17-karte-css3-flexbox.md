---
title: "Ausfahrbare Karte mit CSS3 Transitions und Flexbox"
layout: singlepost
---

Stellt euch vor, ihr braucht eine Karte und eine Liste. Zum Beispiel um Hotels anzuzeigen oder Clubs oder was auch immer. Die beiden UI Elemente konkurrieren um den knappen Platz am Bildschirm: Je größer die Liste, desto mehr Informationen kann sie desto schöner anzeigen. Mehr Platz für große Bilder und dergleichen. Eine kleine Karte bringt aber wenig Überblick und ist umständlich zu bedienen, zu viel Pan & Zoom.

Eine mögliche Lösung ist die Karte ausfahrbar zu machen und das geht mit CSS3 Transitions und Flexbox Layout besonders schick und einfach.

Folgendes Markup: 

~~~ html
<div class="container">
    <div id="map">
    </div>
    <div id="handle">+</div>
    <div id="list"></div>
</div>
~~~

Noch nicht viel dabei. Ein Container für alles, die Karte, ein Handle welches die Aktion triggern soll und die Liste. Der Trick ist jetzt, den Container mit Flexbox zu layouten (die Vendor Prefixe lasse ich weg).

~~~ css
div.container {
	display: flex; /* flex layout*/
	flex-direction: column; /* bitte alles in spalten */
	justify-content: center; /* vertikal zentriert */
	align-items: center; /* horizontal zentriert */
}
~~~ 

Die Karte machen wir 1 Flex hoch, wollen das Attribut aber animiert haben.

~~~ css
div#map {
    display: flex;
	flex: 1;
	transition: flex .2s;
}
~~~

Sobald auf das Handle geklickt wurde, machen wir einfach die Karte größer und der Rest passiert von selbst.

~~~ javascript
var toggled = false;
$( "#handle" ).click( function() {
  if ( !toggled )
    $( "#map" ).css( "flex", "6" );
  else
    $( "#map" ).css( "flex", "1" );
  toggled = !toggled;
});
~~~

Ein Webkit Demo ist [hier](http://jsfiddle.net/prayerslayer/JSyw4/1/) zu sehen.