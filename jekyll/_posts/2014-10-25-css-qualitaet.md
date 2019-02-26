---
title: CSS Qualität
category: project
---

In den letzten sechs Monaten oder so habe ich konsequent alles gebookmarked und gelesen, was auf diversen Mailinglisten (CSS Weekly, Web Design Weekly…) und HN zum Thema [CSS Qualität]({% post_url 2013-03-22-your-css-is-a-mess %}) lief. Hier ist die Liste:

* **CSS bei anderen**: [Github](http://markdotto.com/2014/07/23/githubs-css/), [CodePen](http://codepen.io/chriscoyier/blog/codepens-css), [Lonely Planet](http://ianfeather.co.uk/css-at-lonely-planet/), [Smashing Magazine](http://www.smashingmagazine.com/2014/09/08/improving-smashing-magazine-performance-case-study/), [Medium](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06), [Trello](http://blog.trello.com/refining-the-way-we-structure-our-css-at-trello/)
* **Style Guides**: [FontShop](http://next.fontshop.com/styleguide/globals), [Lonely Planet](http://ianfeather.co.uk/a-maintainable-style-guide)
* **Tips**: [Context Classes](http://drewbarontini.com/articles/single-responsibility/), [Utility Classes](http://davidtheclark.com/on-utility-classes/), [Naming things](http://seesparkbox.com/foundry/naming_css_stuff_is_really_hard), [Refactoring for Maintainability](http://vimeo.com/100501790)

Einen Style Guide zu maintainen ist momentan nicht mein Aufgabenbereich, ich finde aber den Ansatz von Lonely Planet interessant. Dadurch, dass jede UI Komponente gekapselt ist (think Angular Direktive), werden Änderungen daran sofort in der ganzen Codebase übernommen.

Ansonsten waren ein paar hilfreiche Tipps dabei:

### Don’t just wish for clean CSS—make it so!

Bei Github geht der Build kaputt, wenn eine Klasse aus dem CSS nicht verwendet wird. Das ist tatsächlich die einzige Möglichkeit, wie Styles und Templates sauber gehalten werden können. Guter Wille ist irgendwann aus.

Damit das jeder hat und nicht nur Github, habe ich [ein Gulp Plugin](https://github.com/zalando/gulp-check-unused-css) dafür geschrieben. Es überprüft zusätzlich, ob eine Klasse im Template verwendet, aber in keinem CSS Selektor auftaucht. Weil normale Menschen aber CSS Frameworks verwenden, gibt es vordefinierte Sets von ignorierten Klassen (z.B. Bootstrap 3.2.0). Oder ihr macht eure eigenen; ein Utility-Skript dafür liegt auch im Repository.

### Mehr Kontextklassen

Mache ich zu wenig; vielleicht hab ich auch einfach nicht die Use Cases dafür. Ich bin mir aber sicher, dass mehr von der Sorte das LESS sauberer halten können. Also in Zukunft im Auge behalten.

### Weniger Selektoren

Manchmal passiert es, dass eine weniger wichtige Regel eine andre überschreibt, einfach weil sie spezifischer ist. Langfristig bringt es aber selten etwas, mehr Selektoren oder ein `!important` dran zu klatschen. Lieber etwas mehr Zeit investieren und eine bessere Lösung finden.

### Undsonstso

Ein paar Patterns haben sich auch bei mir während der Arbeit herauskristallisiert.

* LESS > SASS. Ich finde SASS kann zu viel. Das wichtigste Feature eines CSS Preprocessors ist Nesting, danach Imports, dann Variablen, schließlich Mixins. LESS gibt mir alles davon mit vertrauter Syntax.
* “Namespacing” wann immer möglich. In quasi jedem LESS File habe ich eine Klasse, die das Modul benennt und alle anderen Styles kommen darunter. Wichtig ist, dass es eine Klasse ist und keine ID, sodass man sich die Wiederverwendbarkeit nicht verbaut (siehe [CSS Specificity](http://www.stuffandnonsense.co.uk/archives/images/specificitywars-05v2.jpg). Zum Beispiel

~~~ css
.article {
    /* alle styles zu einem Artikel kommen hier rein */
}
~~~

* Wie mit Funktionen beim Programmieren ist es auch hier klasse (HA!), wenn Klassen nicht mehr als zwei bis vier Levels oder so geschachtelt werden, weil Übersicht.
* IDs haben ihren Zweck und der ist die Scrollposition.
* Dezidierte [`shame.less`](http://csswizardry.com/2013/04/shame-css/).
* Wie benennt man Module? Es gibt verschiedene Systeme (z.B. Block-Element-Modifier), aber ich finde es am einfachsten, unterschiedliche Teile des Moduls mit Dashes zu trennen. `.article`, `.article-content`, `.article-content-headline`, `.article-content-headline-capital` etc. Wenn das Modul ein zusammengesetztes Wort ist (z.B. Joghurtlöffel), kann man CamelCase machen. Könnte für komplexe Module unpraktisch sein, bis jetzt hat es gereicht.  Und wenn es nicht mehr reicht, sollte man vielleicht eh in mehrere Module aufteilen.
* Wenn ihr automatisierte, User-simulierende Frontendtests (z.B. mit [Protractor](http://angular.github.io/protractor/#/)) macht—was ihr solltet—habt ihr in der Regel das Problem, irgendwelche UI Elemente finden zu müssen. Zum Beispiel den Button, den ihr drücken oder den Header, dessen Farbe ihr checken wollt. Ganz schlecht: Die CSS Klassen, die schon da sind, dafür zu verwenden, denn diese können und werden sich ändern. Stattdessen lieber eigene Attribute definieren, ich verwende z.B. `data-protractor` mit einem aussagekräftigen Wert, sodass die Tests auch lesbar bleiben. Dasselbe Prinzip trifft übrigens für jQuery Plugins zu.
* [Autoprefixer](https://github.com/postcss/autoprefixer) ist super, spart schon 90 % der Mixins, die man bräuchte.

Und wie immer: Your mileage may vary.