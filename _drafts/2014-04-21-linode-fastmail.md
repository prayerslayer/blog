---
title: "Linode und Fastmail"
layout: singlepost
---

Seien wir ehrlich, niemand ist wirklich zufrieden mit seiner IT Infrastruktur. In letzter Zeit war in meinem sozialen Umfeld öfter die Rede von eigenen Servern, deswegen hab ich mich informiert, was ein VPS in 2014 eigentlich kostet. Zunächst will ich nichts weiter, als meinen Blog und ein paar Git Repositories dort zu hosten. Ich finde es aber gut, installieren zu können, was ich für richtig halte. Am Ende ist es ein [Linode](https://www.linode.com/pricing) geworden:
 
* 20$/Monat maximum
* 2 GB RAM
* 48 GB SSD Festplatte
* 3 TB Datentransfer

Reicht völlig aus für ein bisschen Git und HTML. Weil Linode eine amerikanische Firma ist, habe ich mich auch in Europa umgesehen. [HostEurope](https://www.hosteurope.de/en/) kommt da am nächsten, die können aber beim Preis und den Features nicht ganz mithalten.

Das Setup des Linode ging wahnsinnig schnell, dauerte vielleicht 2 Minuten bis ich mich eingeloggt hatte. nginx war auch fix installiert und [konfiguriert](https://library.linode.com/web-servers/nginx/configuration/basic). Etwas umständlicher war [gitolite](http://gitolite.com/). Okay, vielleicht ist es over-engineered, aber ich wollte auf meinem Linode gehostete Repositories auch für andere Leute freigeben können. Diesen will ich wiederum keinen Zugang zum Server geben und genau hier kommt gitolite ins Spiel. Es erstellt einen einzigen User im System (z.b. ``git``), welchem die Repositories gehören. Jeder andere Contributor gibt mir seinen SSH Key, ich hinterlege ihn bei gitolite und fertig. Die Dokumentation ist meiner Meinung nach sehr kompliziert und dass über ``apt`` gitolite 2 reinkomt, während auf Github gitolite 3 gehostet wird, hat mir auch nicht geholfen. Leider kann ich mich nicht mehr wirklich erinnern, was das Problem war, aber es hatte mit falschen SSH Zugangsdaten zu tun. Danach hatte ich meinen vom [Uberspace](https://uberspace.de/) gewohnten Workflow wieder.

Was ich nicht wiederhatte, waren Emails mit eigener Domain. Einen eigenen Mailserver samt SpamAssassin und what not zu installieren, war einfach keine Option. Das ist mir zu viel Aufwand und außerdem sind Emails heikel. Ich möchte nichts verlieren, weil ich mal wieder betrunken war[^1]. Also ein externer Anbieter. Das beste, was ich finden konnte, ist [Fastmail](https://www.fastmail.fm/). Bei HostEurope kostet der Emailservice unglaublich viel Geld und unterstützt keine Custom Domains. Genauso wie [Posteo](https://posteo.de/), leider. Nachdem ich meinen Fastmail Trial Account hatte, war das Setup recht einfach, deren [Dokumentation](https://www.fastmail.fm/help/receive/domains.html) ist ziemlich gut. Im Prinzip habe ich in den DNS Record meiner Domain deren Nameserver eingetragen und dann in den Fastmail Settings eine Ausnahme für den Blog gemacht. Funktioniert offensichtlich.

Fehlte nur noch SSL. In den Uberspace eingeloggt, Zertifikat und Key rauskopiert, in den Linode eingeloggt und zwei Dateien dafür angelegt, nginx [konfiguriert](https://help.ubuntu.com/community/Nginx) und neugestartet, fertig.

Jetzt ist alles wieder wie vorher, nur dass ich bis auf Emails wesentlich mehr Kontrolle habe. Kosten tut das ganze 40 $/Jahr für Fastmail und 20 $/Monat für den VPS, also etwas über 23 $/Monat insgesamt. Sind aktuell ca. 16 €, tut also auch nicht weh.

[^1]: Ist es besser, wenn andere Leute betrunken waren? Eigentlich nicht, aber hauptsache ich bin nicht schuld.