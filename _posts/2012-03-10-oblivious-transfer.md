---
layout: singlepost
title: "Oblivious Transfer"
date: 2012-03-10 11:10:50
---
In der Vorlesung kam eine Variante von [Oblivious Transfer](http://en.wikipedia.org/wiki/Oblivious_transfer), die nicht in der englischen Wikipedia steht. Ich dachte, das sei erwähnenswert.

Das Setting von Oblivious Transfer ist, dass es einen Sender (Alice) und einen Empfänger (Bob) gibt. Alice hat zwei Nachrichten m1 und m2. Bob möchte eine davon bekommen, aber Alice soll nicht wissen, welche. Gleichzeitig soll Bob nichts über die andere Nachricht erfahren. Klingt erstmal komisch (wer sollte das wollen?) und unmöglich, da man *ja irgendwie sagen muss*, welche Nachricht gesendet werden soll.

Das geht! Alice generiert zwei Public/Private Key Paare E1 und D1 sowie E2 und D2, Bob generiert einen symmetrischen Schlüssel K. Alice sendet die zwei öffentlichen Schlüssel an Bob. Wenn Bob m1 haben möchte, verschlüsselt er seinen (symmetrischen) Schlüssel mit E1 und sendet das Ergebnis X=E1(K) an Alice. Will Bob aber m2 bekommen, sendet er X=E2(K). Alice entschlüsselt nun das Ergebnis einmal mit D1 und einmal mit D2, da sie nicht weiß, welchen öffentlichen Schlüssel Bob benutzt hat. Sie erhält K1=D1(X) und K2=D2(X). Für die richtige Kombination von X und D1/D2 erhält Alice den Schlüssel von Bob, für die andere eine zufällige Zeichenfolge. Diese kann sie nicht voneinander unterscheiden, da sie den Schlüssel nicht kennt. Sie benutzt beide Ergebnisse um die Nachrichten zu verschlüsseln und erhält Y1=K1(m1) und Y2=K2(m2), welche sie an Bob schickt. Wenn Bob E1 benutzt hat, ist K1=K und er kann m1 lesen, erfährt aber nichts über m2, da dies mit einem anderen Key entschlüsselt als verschlüsselt wurde. Analog, wenn Bob seinen Schlüssel mit E2 verschlüsselt hat.

Hell yeah, Computer Science!