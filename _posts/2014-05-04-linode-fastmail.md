---
title: "Linode und Fastmail"
layout: singlepost
published: false
---

Seien wir ehrlich, niemand ist wirklich zufrieden mit seiner IT Infrastruktur. In letzter Zeit war in meinem sozialen Umfeld öfter die Rede von eigenen Servern, deswegen habe ich mich informiert, was ein VPS in 2014 eigentlich kostet. Zunächst will ich nichts weiter, als meinen Blog und ein paar Git Repositories dort zu hosten. Ich finde es aber gut, installieren zu können, was ich für wichtig halte. Am Ende ist es ein [Linode](https://www.linode.com/pricing) geworden:

* 20 $/Monat maximum
* 2 GB RAM
* 48 GB SSD Festplatte
* 3 TB Datentransfer

Reicht völlig aus für ein bisschen Git und HTML, weil diese Anwendungen nur einen Haufen Text und keine bis wenige Multimedia-Dateien enthalten. Da Linode eine amerikanische Firma ist (NSA!), habe ich mich auch in Europa umgesehen. [HostEurope](https://www.hosteurope.de/en/) kommt da am nächsten, sie können aber beim Preis und den Features nicht ganz mithalten.

Das Setup des Linode ging wahnsinnig schnell, dauerte vielleicht 2 Minuten bis ich mich in der virtuellen Maschine eingeloggt hatte. nginx war auch fix installiert und [konfiguriert](https://library.linode.com/web-servers/nginx/configuration/basic). Etwas umständlicher war [gitolite](http://gitolite.com/). Okay, vielleicht ist es over-engineered, aber ich wollte auf meinem Linode gehostete Repositories auch für andere Leute freigeben können. Diesen will ich wiederum keinen Zugang zum Server geben und genau hier kommt gitolite ins Spiel. Es erstellt einen einzigen User im System (``git``), welchem die Repositories gehören. Jeder andere Contributor gibt mir seinen SSH Key, ich hinterlege ihn bei gitolite und danach kann derjenige at will via SSH clonen, pushen etc. Die Dokumentation ist meiner Meinung nach sehr kompliziert und dass über ``apt`` gitolite 2 reinkomt, während auf Github gitolite 3 gehostet wird, hat mir auch nicht geholfen. Leider kann ich mich nicht mehr wirklich erinnern, was das Problem war, aber es hatte mit falschen SSH Zugangsdaten zu tun. Beziehungsweise mit der falschen Reihenfolge, mit welcher der SSH Dienst Schlüssel durchprobiert. Danach hatte ich meinen vom [Uberspace](https://uberspace.de/) gewohnten Workflow wieder.

Etwas später hatte ich gemerkt, dass nginx nicht auf die Verzeichnisse im Blog zugreifen konnte. Da ``jekyll build`` vom User ``git`` ausgeführt wird, gehören ihm alle Dateien. nginx arbeitet mit dem User ``www-data``, dem entsprechende Berechtigungen fehlten. Lösung A ist einfach ein ``chmod -R a+rwx`` am Ende des post-receive Hooks, was aber nicht so schön ist.[^1] Aktuelle Lösung B: Eine Gruppe ``www`` aufmachen, die beiden User hinzufügen und am Ende des Hooks ``chmod -R g+rwx`` (nginx braucht unbedingt das ``x``). Nicht viel besser, aber ein bisschen.

Was ich immer noch nicht wiederhatte, waren Emails mit eigener Domain. Einen eigenen Mailserver samt SpamAssassin und what not zu installieren, war einfach keine Option. Das ist mir zu viel Aufwand und außerdem sind Emails heikel, weswegen ich einen externen Anbieter bevorzuge. Das beste, was ich finden konnte, ist [Fastmail](https://www.fastmail.fm/). Bei HostEurope kostet Email unglaublich viel Geld und unterstützt keine Custom Domains. Genauso wie [Posteo](https://posteo.de/), leider. Nachdem ich meinen Fastmail Trial Account hatte, war das Setup recht einfach, deren [Dokumentation](https://www.fastmail.fm/help/receive/domains.html) ist ziemlich gut. Im Prinzip habe ich in den DNS Record meiner Domain deren Nameserver eingetragen und dann in den Fastmail Settings die IP Adresse des Linodes für den Blog eingetragen.

Fehlte nur noch SSL. In den Uberspace eingeloggt, Zertifikat und Key rauskopiert, in den Linode eingeloggt und zwei Dateien dafür angelegt, nginx [konfiguriert](https://help.ubuntu.com/community/Nginx) und neugestartet, fertig.

Jetzt ist alles wieder wie vorher, nur woanders gehostet. Kosten tut das ganze 40 $/Jahr für Fastmail und 20 $/Monat für den VPS, also etwas über 23 $/Monat insgesamt, was aktuell ca. 16 € sind. Ich glaube, so viel ist es mir wert, nicht von Tumblr, Googlemail und Konsorten abhängig[^2] zu sein.

[^1]: Jeder darf alles ausführen? Erm, no thanks.
[^2]: Natürlich nicht 100%ig. Gmail ist die Backup-Adresse für den Fastmail-Account und generell all over the internet, von daher kann ich sie nicht einfach zumachen. Aber ich kann sie langsam deprecaten.