---
layout: singlepost
title: "Softwarepatente"
date: 2012-05-09 22:47:52
---
[Ars Technica](http://arstechnica.com/tech-policy/news/2012/05/jury-rules-google-violated-copyright-law-google-moves-for-mistrial.ars):
>What is clear is that the jury believes that Google did copy something important. Even though Google's code in Android was original or borrowed from other open source code, the jury found that the Android APIs copied the "structure, sequence, and organization" of Java APIs.

Das ist aus verschiedenen Gründen bedenklich.

APIs sind dazu da, einfache Schnittstellen zu komplexen Sachverhalten anzubieten. Ein Vergleich im echten Leben wäre zum Beispiel, dass ich keine Ahnung habe, wie man einen Baum fällt. Wo schneidet man ab? Was ist mit dem Wind? Wie weiß ich, wo er hinfällt? Eine API ist eine Maschine mit einem Knopf "Baum fällen". Da drücke ich drauf und sie macht den Rest.

Jetzt ist es aber so, dass APIs realistischerweise nicht beliebig entworfen werden. Eine API für den Wald muss nun mal Bäume fällen können. Der Knopf dafür ist mit "Bäume fällen" beschriftet, weil es das ist, was er macht. Klar könnte er "Streichholz knicken" heißen, das würde die Funktion nicht einschränken. Aber wer benutzt gern Geräte, wo nicht mal die Knöpfe ordentlich beschriftet sind? Die Maschine muss auch irgendwie wissen, welchen Baum sie fällen muss. Das sollte die einzige Voraussetzung sein, um den Knopf drücken zu können. Zusätzliche Angaben, wie in welche Richtung er umfallen soll, sollten zwecks einfacher Bedienung in einer Art Konfigurationsmenü eingestellt werden können.

Um von dem Real Life Beispiel wieder zurück zu kommen: Neben Aufbau der API, Benennung und Parameter der Funktionen gibt es noch anderes zu bedenken. Bei funktionaler Programmierung können Parameter unter Umständen gar nicht variiert werden, weil das formale Modell dafür nur so definiert ist (vgl Liste als erstes Element und Rest). Was ist außerdem mit C++/C# Wrappern für C-Bibliotheken? Oder Ports in verschiedene Sprachen? Oder [libstdc++](http://en.wikipedia.org/wiki/Libstdc%2B%2B")?

>The C++ Standard Library also incorporates 18 headers of the ISO C90 C standard library ending with ".h", but their use is deprecated. All other headers in the C++ Standard Library do not end in ".h".

Es gibt einige gute Gründe, warum APIs so aussehen, wie sie aussehen. Keiner hat etwas mit geistigem Eigentum zu tun, sondern mehr mit Common Sense, Geschichte und Stand der Forschung. Das Urteil geht wieder mal in die falsche Richtung.