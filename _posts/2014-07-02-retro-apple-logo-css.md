---
title: "Retro Apple Logo mit Font Awesome"
---

Heute brauchte ich einerseits das [Apple Logo von Font Awesome](http://fortawesome.github.io/Font-Awesome/icon/apple/) und andererseits brauchte ich es in Farbe. Jetzt ist das Logo an sich ja weiß/grau, was auf dem meistens weißen/hellgrauen Hintergrund einer Seite nicht so gut sichtbar ist. Eine Alternative ist das bunte Logo aus den Achtzigern damals und zum Glück gibt es CSS Farbverläufe.

~~~~ css
.fa-apple.fa-retro {
    transition: .5s ease-out color;
    color: #16161d;
    background-clip: text;
    background-image:linear-gradient(
                      to bottom,
                      #70c25c 0%, #70c25c 30%,
                      #ffc04a 30%, #ffc04a 42.5%,
                      #fc903d 42.5%, #fc903d 55%,
                      #e94752 55%, #e94752 67.5%,
                      #a954a5 67.5%, #a954a5 80%,
                      #00afe0 80%, #00afe0 100%);
}
~~~~

Was macht das ganze? Zuerst lege ich eine ``transition`` fest, welche die Farbe animiert. Das ist bei Hover oder so immer ganz praktisch. Die Farbe vom Icon ist per default erstmal schwarz. Den Hintergrund clippen wir da, wo das Logo verläuft und schließlich legen wir für den Hintergrund einen Farbverlauf fest. Kurz gesagt: Der Vordergrund ist ein schwarzes Apple Logo, der Hintergrund ist ein buntes Apple Logo.

Um das bunte Logo sichtbar zu machen, setzen wir einfach die Vordergrundfarbe transparent.

~~~~ css
.fa-apple.fa-retro:hover {
    color: transparent;
}
~~~~

Et voilá, [ein buntes Apple Logo](http://plnkr.co/edit/MNH0B8at8ugCTkXaRVqN?p=preview) mit Webfonts und CSS3!

Falls ihr in dem Plunker-Link nun lauter bunte oder schwarze Kästchen seht, habt ihr auch den großen Nachteil von der Variante bemerkt: ``background-clip: text`` gibt es nur in Webkit-basierten Browsern, also nicht im Firefox. Außerdem kann Modernizr nicht verlässlich detektieren, ob der Browser diese Property unterstützt. Also entweder ihr benötigt nur Chrome und Safari, oder naja, Pech. Leider. Oder 90er Style, einfach Bilder nehmen.