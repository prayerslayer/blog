---
title: "Google Reader schließt"
layout: singlepost
---

[Mitte Februar](http://techcrunch.com/2013/02/11/the-googlereaderpocalypse-is-upon-us-googles-feed-reading-service-unusable-since-sunday/) hatte Google Reader Schwierigkeiten, die länger als einen Tag nicht gefixt wurden. [Vor wenigen Tagen](http://googleblog.blogspot.de/2013/03/a-second-spring-of-cleaning.html) gab Google dann bekannt, dass Reader ab 1. Juli nicht mehr nutzbar sein wird.

Natürlich fragen sich einige Leute jetzt, wie es danach weitergehen soll. Ich persönlich habe die Frage Anfang Februar für mich beantwortet: [Götterspeise](https://github.com/prayerslayer/goetterspeise) ist noch in einem sehr frühen Entwicklungsstadium, ich habe noch nicht mal den Crawler geschrieben. Der Anstoss dazu kam auf einer Zugfahrt zwischen Berlin und Dresden, wo man durch ländliche Gebiete ohne Internet fährt. Verwundert darüber, dass Google Reader kein Caching von Posts ermöglicht (HTML5 localStorage, anyone?), beschloss ich selbst etwas zu schreiben und dabei gleich Node.js zu lernen.

Was Götterspeise wird:

* Minimalistisch - keine CSS3 Animationen oder anderes fancy Zeug, nur HTML Links
* Leseoptimiert - keine überbreiten 4000px Bilder, angemessene Schriftgröße und Zeilenabstand
* Optimiert für mobile Geräte - Caching von Artikeln, kein Passwort zum Einloggen

Es wird allerdings keine echte Alternative zu Google Reader für andere Menschen:

* Der Feed Crawler braucht "Google-Scale" um in Sekundenabstand neue Artikel zu registrieren und zu verarbeiten.
* Ich habe keine Lust die inoffizielle -- es gibt meines Wissens keine offizielle -- Reader-API in Syntax und Features nachzubilden (nötig für Clients wie [Reeder](http://reederapp.com/)).

Wenn wer Interesse daran hat, kann er die Entwicklung auf Github verfolgen. Ich sehe dem Ende von Google Reader jedenfalls gelassen entgegen. Götterspeise mag zwar bis Juli nicht fertig sein, aber bis dahin gibt es andere Alternativen.