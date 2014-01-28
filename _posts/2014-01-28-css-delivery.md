---
title: "CSS Delivery"
layout: singlepost
---

Heute war im Email von [CSS Weekly](http://css-weekly.com/) ein Link zu [diesem Post](https://medium.com/coding-design/24888fbbd2e2) auf Medium. Leider ist es dort nicht möglich ausführlich zu kommentieren, deswegen schreibe ich es hier hin.

Der Autor hat richtig erkannt, dass Browser inline CSS (in ``head > style``) nicht extra übers Netzwerk laden müssen und daher schneller verarbeiten können. Er macht dann aber einen gedanklichen Sprung, der so nicht stimmt:

> Placing your CSS within the head of your HTML page does increase the performance of your web page. I feel it is only a matter of time before this approach becomes the default practice.

"Inline ALL the CSS!"

Ich verstehe gut, wie er dort hinkommt. Die Bearbeitungszeit für inline CSS entspricht grob der Zeit, die zum parsen benötigt wird, da der Netzwerkzugriff ja ausfällt. Dasselbe ist bei Stylesheets im Cache der Fall, diese erfordern aber zumindest **einen** zusätzlichen Request am Anfang.

Den Unterschied macht aber die Größe des Stylesheets. Mit inline CSS ist das HTML Dokument jedes Mal um die Größe des Stylesheets größer. Ein Beispiel: Mein letzter Post war 5 KB HTML groß, das CSS für diese Seite ist aber 105 KB schwer. Das wären 21x mehr Daten bei jedem Request mit inline gegenüber externem CSS.

Was aber möglich und laut [Google Pagespeed Guidelines](http://www.feedthebot.com/pagespeed/optimize-css-delivery.html)  eine gute Variante ist: Seiten-spezifisches inline CSS für above-the-fold Content[^1] und ein dynamisch geladenes, externes CSS für die restlichen Styles, welches der Browser cachen kann. So bekommt man quasi das beste aus beiden Welten.

Wieder ein anderes Kapitel sind inline Assets, wie z.B. Bilder oder Fonts. Hier ist zu beachten, dass durch die Base64 Kodierung [mehr als 30 % mehr Daten](http://queue.acm.org/detail.cfm?id=2555617) anfallen können. Außerdem kann der Browser dann keine Requests mehr priorisieren; Bilder werden üblicherweise mit geringerer Priorität angefragt als CSS und JS.

Natürlich kommt es auf den konkreten Anwendungsfall an. Wenn die Bounce Rate hoch ist oder es sowieso nur eine Seite gibt, bringt der Cache nicht viele Vorteile. Aber als Faustregel sollte CSS nur inline sein, wenn es wenig ist.

[^1]: "Above-the-fold" meint einfach den ohne zu scrollen sichtbaren Bereich im Viewport. Der Nutzer nimmt diesen als erstes wahr und deswegen sollte above-the-fold vor below-the-fold gerendert werden, um die gefühlte Ladezeit zu minimieren.