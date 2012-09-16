---
layout: singlepost
title: "Technische Informationen"
---

Bei diesem Blog waren mir zwei Dinge wichtig:
* Einfachheit und damit Geschwindigkeit
* Responsive Design, um für die Zukunft ein bisschen vorgesorgt zu haben

Folgende Techniken habe ich bisher umgesetzt:

* JavaScript Lazy Loading: Der JS Code hier beläuft sich auf etwa 20 Zeilen, der Textinhalt ist wesentlich wichtiger und soll deswegen zuerst geladen werden.
* Komprimiertes JavaScript mit UglifyJS: Weniger Netzwerkkommunikation.
* Komprimiertes CSS mit CleanCSS: Weniger Netzwerkkomunikation.
* Apache Multiviews (Content Negotiation): Schöne URLs.
* gzip Komprimierung der Apache Responses: Weniger Netzwerkkommunikation.
* Adaptive Images: Weniger Netzwerkkommunikation.