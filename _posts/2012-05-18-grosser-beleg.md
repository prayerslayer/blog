---
layout: singlepost
title: "Grosser Beleg"
date: 2012-05-18 13:00:33
category: project
---

Ich bin mit meinem [Großen Beleg](/media/text/GB_Nikolaus_Piccolotto_TUD.pdf) fertig. Das Thema der Arbeit war "Navigation und Selektion in großen semantischen Datensätzen". Semantische Datensätze sind in einigen Bereichen (z.B. Wissensrepräsentation in der DBpedia) sehr hilfreich. Die grafische Repräsentation von großen semantischen Datensätzen, welche zwingend notwendig ist, damit Menschen den Inhalt der Datensätze verstehen können, bringt aber einige Probleme mit sich.

*	**Überblick**: Wie kann der Benutzer einen schnellen Überblick über die wichtigsten Inhalte des Datensatzes bekommen?
*	**Darstellung**: Wie sollen zehntausende Elemente dargestellt werden, ohne den Benutzer zu überfordern.
*	**Navigation**: Wie findet sich der Benutzer in so einer Menge an Daten zurecht?
*	**Filtern**: Wie kann der Benutzer möglichst schnell eine für ihn relevante Teilmenge der Daten finden?
*	**Relationen**: Welche Verbindungen bestehen innerhalb des Datensatzes und wie können Patterns sichtbar gemacht werden?

Ziel war eine Software, welche es dem Benutzer ermöglicht:

1.	**schnell** relevante Teilmengen zu identifizieren,
2.	**einfach** Relationen innerhalb der Daten zu finden,
3.	die eigenen Aktionen **verständlich** nachzuvollziehen.

Diese Fragen habe ich in der Arbeit behandelt und prototypisch implementiert. Zusammenfassend lässt sich sagen, dass viele Hilfsmittel eingesetzt werden müssen, um die Ziele zu erreichen. Im Prototypen (siehe Abbildung) habe ich die Ziele mit folgenden HIlfsmitteln umgesetzt:

1.	[Key Concept Extraction](http://people.kmi.open.ac.uk/motta/papers/key_concepts_aswc.pdf), [Clustering](http://semantic.cs.put.poznan.pl/RMonto/doku.php?id=start), umfangreiche (teils automatische) Filter
2.	Eigenes "Werkzeug", welches Relationen zwischen ausgewählten Daten anzeigt (ähnlich [RelFinder](http://www.visualdataweb.org/relfinder.php))
3.	Zeitleiste, auf der Aktionen des Benutzers aufgetragen werden und die Undo/Redo ermöglicht

![Preselection](/media/img/awesome_screenshot.png)

Die Evaluation des User Interfaces war vielversprechend, aber die Performance des Backends lässt stark zu wünschen übrig. Die Arbeit wurde mit 1.3 bewertet.