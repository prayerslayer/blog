---
title: "Website Scraping: Mit Schema oder ohne?"
layout: singlepost
---

Mein aktuelles [Side Project](https://github.com/prayerslayer/scrape-a-ball) ist eine REST API für die [Basketball Reference](http://www.basketball-reference.com/). Wie der Name schon sagt ist es eine Referenz für Spielergebnisse, Spielerstatistiken und so weiter. Ein Scraper soll regelmäßig die Basketball Reference besuchen, den Inhalt auslesen und in eine Datenbank schreiben. Das ganze befindet sich noch in der Konzeptionsphase und so stellt sich die Frage, ob ein Document Store wie [Mongo](http://www.mongodb.org/) oder eine klassische relationale Datenbank wie [Postgres](http://www.postgresql.org/) eingesetzt werden soll. Im ersten Fall würden die (u.a. bereits aggregierten) Daten einfach als ausgelesenes JSON Dokument ohne weitere Bearbeitung abgelegt ("weil es geht"), im Zweiten würden nur die Rohdaten abgespeichert und der Rest errechnet (siehe Grafik). Beide haben Vor- und Nachteile.

{% image /media/img/sql-vs-nosql.png "Mongo vs Postgres" %}

## Relationale Datenbank

Ich finde die Quelle nicht mehr, aber ich hatte schon mal versucht, mich über SQL vs. NoSQL zu informieren und die Quintessenz war:

> If your schema has relationships use a relational database.

Relationen sind definitiv vorhanden: Ein Spieler spielt bei mehreren Teams (im Laufe seiner Karriere), ein Spiel benötigt genau zwei Teams, ein Team besteht aus mindestens 8 und maximal 13 Spielern und so weiter. Diese könnten wahrheitsgetreu abgebildet werden. Der Vorteil daran ist, dass *Inkosistenzen vermieden* würden, weil alle aus [Boxscores](http://www.basketball-reference.com/boxscores/201306200MIA.html) errechneten Daten ([Advanced Stats](http://www.basketball-reference.com/players/h/howardw01.html#advanced) z.B.) selbst berechnet würden. Als Folge davon können *in Zukunft erfundene Statistiken* ebenfalls ausgegeben werden, die Rohdaten sind ja in der Datenbank vorhanden. Außerdem ist das *Format der API variabel*, denn wie die Daten aufbereitet werden, liegt in meiner Hand.

Allerdings muss immer zuerst überprüft werden, ob abweichende Informationen in der Datenbank stehen, bevor Daten geschrieben werden. Beispielsweise, ob jemandem Steals aberkannt wurden. Ansonsten würde unnötigerweise eine Statistikberechnung gestartet. Das stellt zusätzlich zur Erstellung des Schemas *Entwicklungsaufwand* dar. Das größte Problem ist eigentlich, dass ich nicht abschätzen kann, wie hoch die *Schreiblast* in der Datenbank wird, wenn drei verschiedene Trigger irgendwelche Statistikberechnungen ankurbeln.

## Document Store

Der Document Store wäre in meiner Konzeption so ziemlich das diametrale Gegenstück zum RDBMS. Inkonsistenzen sind möglich, da die Daten mit einem Timestamp versehen in die Datenbank geschrieben würden, inklusive Aggregationen. Dabei würden ältere Versionen einfach überschrieben. Wenn die API Daten anfragt, wird das neueste Dokument ausgegeben. Weil keine Rohdaten erfasst würden, wären auch die durch die API zur Verfügung gestellten Informationen an den Inhalt der Datenbank gebunden. Wenn dort kein Attribut "Opponent Defensive Rating" in den Saisonstatistiken vorhanden ist, dann existiert es nicht.

Der große Vorteil an der Variante mit Document Store ist allerdings, dass es richtig schnell gehen müsste: Basketball Reference lesen, Dokumente in die Datenbank schreiben, Dokumente ausgeben, fertig.

## Fazit

Im Grunde genommen sind die großen Vorteile des RDBMS Zukunftssicherheit und Datenkonsistenz, während der Document Store "nur" mit Entwicklungsgeschwindigkeit punkten kann. Insofern würde ich wohl wieder Postgres einsetzen. Auf der anderen Seite hätte ich es gerne schnell hinter mir, um darauf aufbauende Folgeprojekte angehen zu können. Die API würde auch ziemlich gleich aussehen wie Seiten der Basketball Reference. Alles in allem ziehe ich aber Robustheit gegenüber geringem Entwicklungsaufwand vor. Hallo Postgres!