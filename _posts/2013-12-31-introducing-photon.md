---
title: "Introducing Photon"
layout: singlepost
category: project
---

Für ein Side Project brauchte ich eine Lightbox. Das sieht ungefähr so aus:

{% image http://www.noupe.com/wp-content/uploads/trans/images/slideshow-lightbox-scripts/8.jpg "Lightbox" %}

Gefühlt gibt es ca. zwei Dutzend Lightboxes, mal für jQuery, mal nicht. Zum Beispiel [Fancybox](http://fancyapps.com/fancybox/), [Lightbox2](http://lokeshdhakar.com/projects/lightbox2/) oder [Colorbox](http://www.jacklmoore.com/colorbox/).

Bevor ich erkläre, was mich gestört hat, erwähne ich am Besten meinen Anwendungsfall: Es ist ein Suchinterface für Expedia, dabei werden Bilder von Hotels und Hotelzimmern angezeigt. Wenn ich nach Hotels suche, will ich durch die Bilder möglichst schnell durch und möglichst viel von ihnen sehen. Schließlich werde ich mir sicher mehrere Hotels anschauen, die aber alle unter Umständen 50 Bilder haben.

Dann wundert es vermutlich nicht mehr, warum ich ein Problem mit zu langsamen Animationen (Fancybox, Lightbox2), springenden Controls (Colorbox) oder zu kleinen Bildern (Fancybox) habe.

Aber keine Angst, [Photon](http://prayerslayer.github.io/photon.js/) to the rescue! Es tut genau, was es soll und nicht mehr.

{% image {{site.url}}/media/img/photonjs.png "Photon" %}

Die Vorzüge von Photon im einzelnen:

* Versucht so viel wie möglich Platz auf der Seite dem Bild zu geben.
* Zeigt Caption (``alt`` Attribut) an, wenn gewünscht.
* Vor/Zurück-Controls unten rechts bleiben immer dort.
* Alternativ Tastatursteuerung mit Pfeil links/rechts, Escape.
* Keine zeitraubenden Animationen!
* Keine Spinner, die überhaupt nicht zum Look eurer Seite passen.
* Unterstützt nur Bilder, d.h. kein unnötiger Code für AJAX Requests.
* Klein: 4.5 KB minifiziertes, nicht-gzip'tes JS+CSS.
* Universal: Müsste (ähem...) in allen Browsern funktionieren.
* Keine Abhängigkeit von jQuery, obwohl ich nicht weiß, ob das heute noch ein Kriterium ist.

Wenn jemand Vorschläge hat oder auf Probleme stößt, würde ich mich über PRs/Issues auf [Github](https://github.com/prayerslayer/photon.js) freuen.

Außerdem: Guten Rutsch!

---

**PS** an die Leute, die sich zwischendrin gefragt haben, ob ich mir die Lightboxes auch mal genauer angesehen habe: Ich weiß, dass alle bis zu einem gewissen Grad konfigurierbar sind. Sehr wahrscheinlich hätte ich eine davon anpassen können. Aus zwei Gründen habe ich trotzdem selbst eine Lightbox geschrieben:

1. Übung macht den Meister. Man lernt immer was dazu und so kleine Tools sind schnell geschrieben.
2. Fancybox unterstützt z.B. "images, HTML elements, SWF movies, Iframes and also Ajax requests". Ich brauche nur das erste davon und will den Code für den Rest nicht laden müssen.