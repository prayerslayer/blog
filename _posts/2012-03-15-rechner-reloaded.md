---
layout: singlepost
title: "Rechner Reloaded"
date: 2012-03-15 16:42:31
---
Mich stört an der [Rechner App](http://nikolaus-piccolotto.info/2012/03/rechner) (ohne sie probiert zu haben), dass nur Addition und Subtraktion effizient ausgeführt werden können. Für Multiplikation und Division muss erst mit einem Swipe das "Menü" aufgerufen und mit einem Tap die Operation gewählt werden.

Außerdem wirkt die App sehr minimalistisch, bietet aber an, Wurzeln zu berechnen. Das passt wie ich finde nicht ganz zusammen, denn zumindest ich habe in meinem alltäglichen Leben außerhalb der Universität noch nie die Wurzel einer Zahl benötigt. Schon eher hilfreich wären Klammern und Exponenten, zum Beispiel zur Zinseszinsberechnung, gewesen.

Um das (visuell) minimalistische Versprechen zu halten und Grundrechenarten schnell ausführen zu können, hätte ich folgendes getan: Zuerst werden die vier Swipe-Achsen freigemacht, indem die [umgekehrte polnische Notation](http://de.wikipedia.org/wiki/Polnische_Notation) verwendet wird. Die in der Schule gelernte Form 2+2= wird als 2_2+ geschrieben. So wird die Geste für = obsolet, es wird gerechnet sobald ein Operator eingegeben wird. Es braucht ein Trennsymbol (_), damit die Operanden unterschieden werden können. Dieses wird zwischen 0 und Komma eingefügt. Etwas anderes als die vier Grundrechenarten wird nicht unterstützt, so erspart man sich das Menü. Nun sind alle vier Achsen für Operatoren frei (siehe Bild). Ein 2-Finger-Swipe setzt alles zurück.

[![Rechner App]({{ site.host }}/media/img/rechner-app.png "Rechner App")]({{ site.host }}/media/img/rechner-app.png)

Einziger Nachteil an der Geschichte: Die polnische Notation ist für die meisten Menschen ein ziemlicher Dealbreaker, weil sie praktisch unbekannt ist. Und die gedankliche Form einer Rechnung umlernen, für einen Taschenrechner? Eben.