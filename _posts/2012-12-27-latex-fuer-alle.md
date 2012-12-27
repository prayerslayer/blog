---
title: "LaTeX für alle"
layout: singlepost
keywords: "latex, tutorial, beginner, dropbox, git"
---

Kürzlich wurde ich gefragt, wie jemand am besten seine Doktorarbeit schreibt. Ich dachte, ich schreib hier mal eine (hoffentlich verständliche) Anleitung für alle von anderen Fakultäten als der für Informatik auf. 

**tl;dr:** Verwendet LaTeX, wenn ihr mehr als 15 Seiten schreiben wollt. Der Aufwand zur Einarbeitung ist ohne Frage höher als mit Word oder Google Docs, aber es lohnt sich.

*"Was ist LaTeX?"*

[LaTeX](http://de.wikipedia.org/wiki/LaTeX) ist keine Software wie Word und keine Webapplikation wie Google Docs, sondern eine Markupsprache wie [HTML](http://de.wikipedia.org/wiki/HTML). Um Text fett zu machen, verwendet man in HTML Tags.

~~~ html
	<strong>Fett</strong>, Alter!
~~~

Dasselbe Prinzip ist auch in LaTeX gültig, allerdings werden sogenannte Kommandos eingesetzt.

~~~ latex
	\textbf{Fett}, Alter!
~~~

LaTeX kann auch das ganze Softwarepaket meinen, welches ihr benötigt, um tatsächlich ein PDF eurer Arbeit zu erzeugen. Wie bei HTML mit dem Browser braucht es auch in LaTeX etwas, das euer Markup interpretiert und in sichtbare Ergebnisse umsetzt.

*"Ja, aber hä? Das ist total umständlich. Warum kein Word?"*

Am Anfang wird LaTeX euch übelst ankotzen, keine Frage. Meiner Meinung nach ist der größte Vorteil aber die explizite Formatierungsangabe. Kennt ihr [Formatvorlagen in Word](http://www.studium-und-pc.de/word-formatvorlagen-anwenden.htm)? Wenn nicht, shame on you! Wenn ja, wendet ihr sie immer konsequent an oder macht ihr doch mal der Einfachheit halber direkt ein paar Wörter fett anstatt eine neue Vorlage zu definieren? Dachte ich mir. Und hier liegt der Vorteil: Da ihr mit LaTeX gar nicht anders könnt, als konsequent Formatvorlagen in Form von Kommandos zu benutzen, fällt es gegen Ende hin (wenn ihr schon 80 Seiten Inhalt habt) einfacher, die Formatierung zu ändern.

Weiters sind mit LaTeX Quellenangaben einfacher umzusetzen als mit Word. Ihr speichert diese in einer eigenen Datei mit Hilfe der Software eurer Wahl (dazu später mehr) und importiert sie quasi in euer Hauptdokument. Das Format des Literaturverzeichnisses und der Zitierungen kann danach beliebig geändert werden. Ohne dass 12 eurer 120 Zitierungen übersehen werden.

Außerdem seid ihr flexibler in der Wahl eurer Software: Worddokumente gehen nur mit Microsoft Word gut, LaTeX ist aber Text wie jeder andere. Ihr könnt einen beliebigen Texteditor nehmen, theoretisch. In der Praxis wollt ihr einen, der die LaTeX-Kommandos farblich hervorhebt ([Syntax Highlighting](http://de.wikipedia.org/wiki/Syntaxhervorhebung)) und auch direkt mit dem LaTeX-Softwarepaket zusammenarbeitet. Aber das nur am Rande.

*"Es gibt doch einen Haken!"*

Ja. Wie gesagt ist die Einarbeitungszeit relativ hoch. Außerdem gibt es tausende Kommandos und Pakete (Sammlungen von Kommandos), die oft das gleiche tun. Dann ist es nicht eindeutig, welches verwendet werden soll. Und weil ihr reinen Text schreibt und keinen [WYSIWYG](http://de.wikipedia.org/wiki/WYSIWYG)-Editor wie Word zur Verfügung habt, ist die Navigation im Dokument schwieriger. Hier kann allerdings [writelatex.com](https://www.writelatex.com/) Abhilfe schaffen. Dort könnt ihr online (lies: ohne viel Software installieren zu müssen) LaTeX schreiben und seht auch gleich das Ergebnis.

Dennoch: Wenn ihr den Weg des LaTeX wirklich gehen wollt, sucht euch nach Möglichkeit einen Ansprechpartner.

*"Ich vertraue dem Internet nicht! Außerdem ist writelatex.com noch in der Beta."*

Fein! Jetzt braucht es vier bis fünf Schritte, bis ihr anfangen könnt.

# 1) TeX

Ihr benötigt ein TeX Softwarepaket, welches euer LaTeX-Markup versteht und in PDF ausgeben kann. Unter Windows ist das [MikTeX](http://miktex.org/), für Mac-User ist bereits mit [TexShop](http://pages.uoregon.edu/koch/texshop/) gesorgt. Letztere können bei Schritt 2 weitermachen, da TexShop einen Editor mitliefert.

Installiert eure TeX-Distribution.

*"Das fängt ja gut an, meine Fresse."*

# 1a) Editor

Ihr braucht einen Editor, in dem ihr euer LaTeX-Fu komfortabel schreiben könnt. Für Windows empfehle ich [TeXstudio](http://texstudio.sourceforge.net/). Theoretisch ginge auch ein Editor wie [Sublime Text 2](http://www.sublimetext.com/2). Dann müsst ihr aber der [Kommandozeile](http://www.chip.de/ii/243989041_a203f793ab.jpg) mächtig sein, überlegt es euch gut!

Installiert einen Editor eurer Wahl. (Im Folgenden gehe ich davon aus, dass ihr euch für TeXstudio entschieden habt.)

*"Toll. Und jetzt?"*

TeXstudio und MikTex sollten out-of-the-box miteinander harmonieren. Wenn nicht, könnte das daran liegen, dass TeXstudio die Pfade zu MikTeX nicht kennt. Das müsstet ihr [überprüfen](http://svn.code.sf.net/p/texstudio/code/trunk/utilities/usermanual_en.html#SECTION02). Um die Kommandos von LaTeX zu lernen, empfehle ich, mit [writelatex.com](https://www.writelatex.com/) herumzuspielen. Dort seht ihr eine [Beispieldatei]( {{ site.host }}/media/text/example.tex ), das finde ich persönlich immer besser als sich durch [seitenlange Tutorials](http://www.tug.org/twg/mactex/tutorials/ltxprimer-1.0.pdf) zu kämpfen.

Ein zusätzlicher Tipp: Teilt eure Kapitel in eigene TeXdateien auf und bindet sie wie folgt in euer Hauptdokument ein:

~~~ latex
	\input{kapitel01.tex}
	\input{kapitel02.tex}
~~~

(In den Kapiteln könnt ihr direkt mit dem Kapitel ``\chapter`` loslegen, es braucht keine ``\documentclass`` mehr.) Das hat zwei Vorteile:

* Einfachere Navigation, weil ihr euch nur innerhalb eines Kapitels bewegt. Bei insgesamt 4000 Zeilen TeX macht das schon etwas aus.
* Einfachere Rücksetzmöglichkeiten, weil ihr dazu weniger git-Mojo benötigt.

Der Nachteil ist dabei, dass ihr für die Konvertierung in PDF immer das Hauptdokument verwenden müsst. Gerade am Anfang ist der ständige Wechsel etwas umständlich.

# 2) Literaturverwaltung

Bei einer großen Arbeit habt ihr wahrscheinlich mindestens 50 Quellen, alle von verschiedenen Autoren und mit unterschiedlich viel Informationen dabei: Mal nur Autor und Titel, bei anderen auch Journal, Jahr und Seite. Es ist hilfreich, diese Quellen ordentlich zu organisieren, sodass ihr nach Autor oder Titel sortieren, eigene Stichwörter hinzufügen und Informationen einfach ändern könnt. Ein weiterer Vorteil eurer Quellendatenbank: Änderungen werden gleich ins PDF übernommen und ihr könnt den Zitierungsstil (APA, Harvard, Chicago...) auch später mit minimalem Aufwand ändern.

Für Windows nehmt am Besten [JabRef](http://jabref.sourceforge.net/) (ihr benötigt leider auch [Java](http://www.java.com/en/download/index.jsp)), für MacOS ist [Bibdesk](http://bibdesk.sourceforge.net/) ziemlich super. Installiert eins der beiden.

Die Grundlage der Literaturverwaltung ist das [Bibtex-Format](http://www.bibtex.org/Format/). Ihr wollt eure Quellen in diesem Format beziehen. Für Informatiker ist das bei [ACM](http://dl.acm.org/), [IEEE](http://ieeexplore.ieee.org/Xplore/guesthome.jsp) und Konsorten Standard (meistens unter "Export citation" oder so ähnlich). Bei Medizinern ist es schon schwieriger, da ihr bei [PubMed](http://www.ncbi.nlm.nih.gov/pubmed) kein Bibtex exportieren könnt. Dafür gibt es aber ein [Konvertierungstool](http://www.bioinformatics.org/texmed/): Bei PubMed Publikation finden, URL kopieren, bei TeXMed danach suchen, Bibtex bekommen. Umständlich, aber immer noch einfacher als mit der Hand zu tippen. Für andere Fakultäten gibt es bestimmt ähnliches, googelt einfach nach ``[euer Portal] bibtex``.

*"Von mir aus. Und was mache ich mit dem Bibtex?"*

In JabRef erstellt ihr eine neue Quelle, klickt auf den "BibTeX Source" Tab (unten rechts zu sehen), fügt es dort ein und speichert - Voilá.

![JabRef](http://jabref.sourceforge.net/images/JabRef-ScreenShot-MainWindow.png)

In Bibdesk gibt es einen praktischen Shortcut, nämlich ``ALT+CMD+L``, um Bibtex aus der Zwischenablage direkt in eine neue Quelle umzuwandeln.

*"Diese Zitierungen in meiner Arbeit referenzieren: Wie?"*

In eurer Literaturverwaltung gibt es bei jeder Quelle einen "Citation Key", eine beliebige Zeichenkette. Nutzt sie sinnvoll, zum Beispiel in Form von "Smith1999" und nicht fortlaufend 1, 2, 3 etc. Diesen Key packt ihr ins ``cite`` Kommando.

~~~ latex
	Never send a human to do a machine's job. \cite{Smith1999}
~~~

*"Die Zitierung sieht beschissen aus. Kann ich so nicht abgeben."*

Natürlich könnt ihr den Zitierungsstil ändern. Die sind ja immer so ein Thema. Manchen ist es egal, solange die Arbeit lesbar bleibt (vernünftige Menschen), andere sind kleine Stilhitler. In LaTeX gibt es mit dem Package "natbib" (``\usepackage{natbib}`` nach ``\documentclass``) verschiedene [Stile](http://sites.stat.psu.edu/~surajit/present/bib.htm), ihr könnt euch einen davon aussuchen. In aller Regel will euer Betreuer einen von diesen. Das Literaturverzeichnis wird übrigens wie folgt ausgegeben:

~~~ latex
	\bibliography{Name der .bib Datei}
~~~

Abschließend zur Literaturverwaltung: Es ist oft (aber nicht immer) so, dass ihr nach Änderungen an eurem Literaturverzeichnis (neue Quellen, geänderte Quellen...) zuerst über den Editor die ``bibtex`` Software ausführt, damit die Quellen neu eingelesen werden.

# 3) Versionsverwaltung

Eure Arbeit durchläuft mehrere Phasen, bis sie endlich fertig ist. Zuerst werdet ihr Kapitel nur grob mit Stichpunkten füllen, dann ein paar Absätze schreiben, wieder verwerfen, mehr Absätze schreiben, euren Betreuer drüberlesen lassen, wieder etwas ändern und so weiter. Vielleicht wart ihr auch schon an dem Punkt, wo ihr etwas Gelöschtes gerne wieder hättet. Vielleicht weil euer Betreuer seine Meinung geändert hat. Hier kommt die Versionsverwaltung ins Spiel.

[git](http://en.wikipedia.org/wiki/Git_(software)) ist der Stand der Dinge, was Versionsverwaltung angeht. git beobachtet einen Ordner eurer Wahl (das sogenannte "Repository") und bemerkt Änderungen an Dateien. Diese könnt ihr dann verwerfen oder permanent machen ("commiten"). Später ist es möglich, wenn nötig, Teile von älteren Versionen eurer Arbeit wieder zurückholen.

Installiert Github für [Windows](http://windows.github.com/) oder für [Mac](http://mac.github.com/).

*"Ich habe keine Ahnung, was ich hier tue."*

Im Folgenden erkläre ich die wichtigsten Funktionen der Github App. Die Anwendung sieht bei beiden Betriebssytemen sehr ähnlich aus, ich verwende Screenshots der Mac-Version. Wenn ihr die Anwendung öffnet, werdet ihr gefragt, ob ihr euch einloggen oder registrieren wollt (bei [Github](https://github.com/)). Das müsst ihr nicht, aber es ist sinnvoll, unter "Optionen" Name und Emailadresse anzugeben - zwecks der Lesbarkeit.

![Login]( {{ site.host }}/media/img/githublogin.png)

Erstellt dann ein neues Repository, wählt einen Namen und einen Ordner. "Push to Github" könnt ihr ausstellen, wir speichern in die Dropbox. Kopiert euren bisherigen Ordner in den Ordner des Repositorys.

*"Das funktioniert jetzt wie?"*

Links unter "Changes" seht ihr noch nicht übernommene Änderungen. Auf obigem Bild ist eine neue Datei "example.tex" dazugekommen. Diese lassen wir mit der Checkbox ausgewählt um die Änderungen mit einem "Commit" zu übernehmen. Diesem geben wir einen kurzen Namen und eine mehr oder weniger ausführliche Beschreibung. In der Praxis solltet ihr aussagekräftige Beschreibungen wählen, sodass ihr sofort wisst, welchen Stand der Arbeit ein Commit repräsentiert. Das Symbol mit den Pfeilen und dem Plus links neben dem Commit-Button könnt ihr so lassen. "Commit & Sync" brauchen wir nicht, da wir nicht mit Hilfe von git synchronisieren, also die Versionen backuppen.

![Repository]( {{ site.host }}/media/img/githubrepo.png)

Nachdem ihr euren ersten Commit durchgeführt habt, zeigt auch die History etwas an.

![History]( {{ site.host }}/media/img/githubcommit.png )

Dort könnt ihr auch einen Commit auswählen (mit dem Pfeil rechts). Dann werden euch die Änderungen in diesem Commit im Vergleich zur vorhergehenden Version angezeigt. Ihr könnt diese Änderungen mit "Revert Commit" rückgängig machen. Diese Reverts sind wiederum eigene Commits, die rückgängig gemacht werden können: Einfach einen beliebigen Commit davor auswählen und "Roll back to this commit" auswählen.

![Revert]( {{ site.host }}/media/img/githubrevert.png )

Branches und Settings könnt ihr ignorieren. Ihr wisst nun, wie ihr Änderungen in eurer abspeichert und wiederherstellt. Toll! One more thing...

# 4) Dropbox

Ihr habt bis jetzt ein Setup um Quellen zu sammeln und zu verwalten, um Text zu schreiben und in PDF zu konvertieren und um verschiedene Versionen eurer Arbeit zu verwalten. Ihr schreibt 100 Seiten und plötzlich geht euer Notebook in Flammen auf. Ups.

[Dropbox](https://www.dropbox.com/home) kennt ihr wahrscheinlich. Damit synchronisiert ihr einen Ordner eurer Wahl "mit dem Internet". Ihr könnt den Stand eurer Arbeit an einem anderen Rechner über Dropbox runterladen und weiterarbeiten.

Macht euch einen Account bei Dropbox und installiert die [Software](https://www.dropbox.com/downloading), welche automatisch Sicherungskopien eurer Arbeit auf die Dropbox-Server macht. Am Besten legt ihr einfach den Ordner, welcher eure Arbeit enthält und auch das git Repository ist, in den Standard-Dropboxordner.

# 5) Profitieren

Die Einarbeitungszeit ist hoch, aber ihr habt nun einige Vorteile:

* Flexible Formatierung mit LaTeX: Ändert eine halbe Stunde vor dem Druck euren Zitierungsstil innert 2 Minuten.
* Organisierte Quellen mit Bibtex: Macht euch Stichworte zu Papers, sortiert nach Autoren, habt den Durchblick.
* Zeitmaschine mit git: Springt zwischen verschiedenen Versionen eurer Arbeit hin und her. Übernehmt Teile von früher wieder, löscht andere, macht es rückgängig. Alles ist möglich!
* Sicherheit mit Dropbox: Wenn alle Rechner kaputt gehen, auf denen ihr jemals gearbeitet habt, holt ihr einen Neuen, installiert die Software und macht weiter, wo ihr aufgehört habt.

*"Ich nehm doch Word." - Jetzt, jeder.*