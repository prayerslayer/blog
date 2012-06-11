---
layout: singlepost
title: "Mobile Passwort Manager"
date: 2012-03-17 18:28:01
---
[ElcomSoft](http://www.elcomsoft.com/WP/BH-EU-2012-WP.pdf) hat ein paar evaluiert:
>The app also maintains a file which contains public and private RSA keys (same ones as in the keychain), master password, and answer to secret question, both encrypted using aforementioned RSA keys. The fact that private RSA key is stored in the file allows to instantly decrypt master password (as well as any other record in the database).

Ich lese das so als ob die RSA Keys als Klartext in der Datei stehen und nur Masterpasswort sowie Antwort auf geheime Frage verschlüsselt werden. Was ungefähr so sicher ist wie die Kombination als Post-it an den Safe zu kleben. Aber es gibt auch einige, die gleich alles als Klartext speichern. Was dann etwa die Sicherheit einer Plastikfolie bietet. Oder einer Käseglocke.

1Password hingegen hat eine recht versteckte Schwachstelle: Durch den gewählten Paddingalgorithmus haben die letzten 16 Bytes des korrekten Schlüssels immer die Form 0x10, was die Validierung eines geratenen Passworts beschleunigt.

Also, passt auf das Gerät auf. Die sind schneller weg als man glaubt. Und verschlüsselt das Backup, wenn es möglich ist.