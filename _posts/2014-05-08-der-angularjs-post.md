---
layout: singlepost
title: "Der AngularJS Post"
---

Da ich jetzt täglich mit Angular arbeite, hier eine Sammlung von Links und Tipps, die sich in den ersten Monaten ergeben hat.

# Links

* [Offizielles Tutorial](https://docs.angularjs.org/tutorial) — das ist tatsächlich ziemlich gut, finde ich.
* [Angular Best Practices](https://www.youtube.com/watch?v=ZhfUv0spHCY)
* [Videos von der ng-conf](https://www.youtube.com/user/ngconfvideos)
* [Angular testen mit Karma](http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html)
* [Angular testen und debuggen](http://www.yearofmoo.com/2013/09/advanced-testing-and-debugging-in-angularjs.html)
* [Using ngModelController](http://www.chroder.com/2014/02/01/using-ngmodelcontroller-with-custom-directives/) — muss ich mir jedes Mal aufs Neue durchlesen, wenn ich eine Direktive schreibe.
* [Angular and D3.js](http://alexandros.resin.io/angular-d3-svg/) — beide machen DOM Data Binding, wenn man nicht aufpasst.

# Tips

Wenn ich hier von Direktiven rede, stellt euch z.B. folgendes vor:

    <tabset>
        <tab heading="tab1"> <!-- content --> </tab>
        <tab heading="tab2"> <!-- content --> </tab>
    </tabset>

* Angular ist mächtig. Nutzt es wann immer möglich! Wenn ihr etwas "wie mit jQuery" macht, ist es falsch.
* Controller in Direktiven sind hauptsächlich für Kommunikation mit Subdirektiven nützlich. Damit ``tabset`` überhaupt weiß, wie viele ``tab``s in ihr drin sind.
* Angular parst zuerst die Subdirektiven und setzt deren Templates ein, wenn vorhanden. Kommt die Parentdirektive in die ``link`` Phase, gibt es keine ``tab``s mehr.
* ngModelController braucht man genau in dem Moment, wo nicht nur Controller-->Direktive Data Binding Magic passieren soll, sondern auch andersrum.
* ngModelController schaut aber nur auf Reference Equality. Wenn das Model ein Array ist, muss man selbst ein ``$watchCollection()`` einbauen.
* Falls ihr die Angular App manuell mit ``angular.bootstrap()`` hochfährt, macht es am ``body`` Element. Das funktioniert gut mit Protractor.
* Protractor! Packt am besten alles, was vor einer Suite passieren soll, in ein ``beforeEach()``. Keine "losen" Statements. Und jede Suite (jedes ``describe()``) braucht ein eigenes ``beforeEach()``.