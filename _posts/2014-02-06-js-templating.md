---
title: "Templating in Javascript, 2008"
layout: singlepost
---

Ich habe heute Nachmittag eine [Templating Engine](https://github.com/prayerslayer/temple.js) für Javascript geschrieben. Sie ist zwar ein One-Trick-Pony, aber ziemlich schnell. Immerhin 55 % schneller als [Handlebars](http://handlebarsjs.com/) in meinen einfachen Tests.

Dann fiel mir ein, dass John Resig ja auch mal sowas [geblogt](http://ejohn.org/blog/javascript-micro-templating/) hatte. Seine Version ist kürzer und vielseitiger als meine, deswegen will ich sie hier einmal auseinander nehmen und erklären:

~~~~ javascript
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        "with(obj){p.push('" +
       
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    return data ? fn( data ) : fn;
  };
})();
~~~~

Prinzipiell funktioniert sein Templating so:

1. Nimm einen Template-String entgegen
2. Erstelle eine Funktion, welche die Variablen im String durch tatsächliche Werte eines Objekts ersetzt
3. Gib diese Funktion zurück

Ich verwende als Beispiel dieses kleine Template, damit man sieht, was so passiert:

~~~~ html
<div class='<%= dollars > 5 ? "rich" : "" %>'>
	<h1><%=name%></h1>
	<p>She has <%=dollars%> $.</p>
</div>
~~~~

Also, hinein in den Code!

Zeile 3 & 28: Das ganze Konstrukt ist eine Immediate Function, um den globalen Namespace nicht mit den eigenen Variablen zu befüllen und vielleicht so die anderer Bibliotheken zu überschreiben.

~~~~ javascript
(function(){ /*...*/ })();
~~~~

Zeile 4: Wenn ein Template kompiliert, d.h. in eine Funktion umgewandelt wurde, wird diese im Objekt ``cache`` gespeichert. So muss getane Arbeit nicht mehrfach verrichtet werden.

~~~~ javascript
var cache = {};
~~~~

Zeile 6: Die Signatur der Funktion, welche das Template kompiliert. Sie nimmt einen String und ein Objekt mit Daten entgegen. ``this`` ist hier ``window``.

~~~~ javascript
this.tmpl = function tmpl(str, data){
~~~~

Zeilen 9–11: Hier geht die eigentliche Action los. ``fn`` ist die Variable, welche die kompilierte Template-Funktion hält. Zuerst wird überprüft, ob der String schon das Template oder die ID eines DOM Elements ist. Die beiden Slashes definieren eine Regular Expression, ``\W`` matcht alle Zeichen **außer** alphanumerische und Underscore. Das bedeutet, wenn dieser Test ``true`` liefert, sind Zeichen der Art ``<%`` enthalten und der String ist ein Template.

Wenn der String also kein Template ist, wird eine möglicherweise gecachte Version zurückgegeben oder im Falle eines Cache Miss die Funktion **mit** Template noch einmal aufgerufen.

~~~~ javascript
var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
~~~~

Zeile 11: Der String ist definitiv ein Template und ab hier wird das kompilierte Template erstellt. Dafür verwendet John Resig den ``Function`` Konstruktor. Er nimmt beliebig viele Parameter, wobei die Parameter ``0`` bis ``n-1`` die Signatur der Funktion und der letzte den Body der Funktion beschreibt. Die Funktion nimmt also ein Objekt ``obj``, welches die Daten fürs Template enthält. Danach kommt der Code der Funktion.

~~~~ javascript
new Function("obj",
~~~~

Zeile 12: Hier wird ein Array definiert, in dem alle Codezeilen gehalten und am Ende zusammengefügt werden (``p``). Danach kommt eine Funktion ``print()``, welche die übergebenen Parameter zu ``p`` hinzufügt. Diese wird später aber nicht verwendet und hat auch sonst keine offensichtliche Funktion, also könnte man sie auch weglassen.

~~~~ javascript
"var p=[],print=function(){p.push.apply(p,arguments);};" +
~~~~

Zeile 14: Jetzt wechselt er vom Kontext von ``window``, der standardmäßig bei durch Function-Konstruktor definierten Funktionen festgelegt ist, zum Kontext des Objekts. Das passiert mit dem ``with`` Statement. Im Block danach zeigt ``this`` auf ``obj``. Auf diese Weise kann beispielsweise ``obj.name`` ganz einfach durch ``name`` angesprochen werden, was doppelt sinnvoll ist, da die Variablen im Template auch die Form ``<%=name%>`` haben. Danach werden die Codezeilen generiert.

~~~~ javascript
"with(obj){p.push('" +
~~~~

Zeile 17: Hier wird es lustig und ein bisschen kompliziert. ``str`` hält den ganzen Template-String so wie er oben steht. Diese Zeile entfernt erstmal alle Tabs (``\t``), Carriage Returns (``\r``) und Newlines (``\n``) und ersetzt sie durch ein Leerzeichen. Heraus kommt wieder ein String.

~~~~ javascript
str.replace(/[\r\t\n]/g, " ")
~~~~

~~~~
<div class='<%= dollars > 5 ? "rich" : "" %>'>  <h1><%=name%></h1>  <p>She has <%=dollars%> $.</p> </div>
~~~~

Zeile 18: Hier wird der Anfang einer Variable oder eines Codeblocks durch einen Tab ersetzt. Das ist okay, weil wir vorher alle Tabs entfernt haben und dieses Zeichen deswegen eindeutig ist.

~~~~ javascript
.split("<%").join("\t")
~~~~

~~~~
<div class='\t= dollars > 5 ? "rich" : "" %>'>  <h1>\t=name%></h1>  <p>She has \t=dollars%> $.</p> </div>
~~~~

Zeile 19: Vor der Variable ist bereits ein ``\t``. Hier ersetzt er ein ``'`` vor und hinter der Variablen durch ein ``\r``. Die Regex matcht am Anfang des Strings bzw. am Ende einer Variablen (``(^|%>)``), solange kein Tab auftaucht (``[^\t]*``) und dahinter ein ``'`` kommt. Wir definieren unsere Strings mit einfachen Quotes und müssen daher den Fall abfangen, dass der Autor des Templates das auch tut.

~~~~ javascript
.replace(/((^|%>)[^\t]*)'/g, "$1\r")
~~~~

~~~~
<div class=\r\t= dollars > 5 ? "rich" : "" %>\r>  <h1>\t=name%></h1>  <p>She has \t=dollars%> $.</p> </div>
~~~~

Zeile 20: Hier holt er sich den Namen der Variablen heraus, indem er mit der non-greedy Capture Group ``(.*?)`` alles nach ``\t=`` und vor ``%>`` matcht. Diesen Teil, also alles, was von der Variable übrig war, klammert er in Kommas.

~~~~ javascript
.replace(/\t=(.*?)%>/g, "',$1,'")
~~~~

~~~~
<div class=\r', dollars > 5 ? "rich" : "" ,'\r>  <h1>',name,'</h1>  <p>She has ',dollars,' $.</p> </div>
~~~~

Zeile 21: An dieser Stelle ersetzt er die Tabs, falls vorhanden, durch ``');``. Diese können noch von Konstrukten wie einer inline-geskripteten for-Schleife übrig sein, welche mit ``<% for ...`` angegeben wird. Die Regex aus Zeile 20 matcht aber nur Tabs mit ``=`` dahinter.

~~~~ javascript
.split("\t").join("');")
~~~~

~~~~
<div class=\r', dollars > 5 ? "rich" : "" ,'\r>  <h1>',name,'</h1>  <p>She has ',dollars,' $.</p> </div>
~~~~

Zeile 22: Nun wird das Ende der Variablen oder Codeblocks durch ``p.push('`` ersetzt, wenn es noch da ist. Auch hier hat das wieder mit inline Skripts zu tun, da deren schließender Tag durch Zeile 20 nicht behandelt wurde.

~~~~ javascript
.split("%>").join("p.push('")
~~~~

~~~~
<div class=\r', dollars > 5 ? "rich" : "" ,'\r>  <h1>',name,'</h1>  <p>She has ',dollars,' $.</p> </div>
~~~~

Zeile 23: Das ``\r``, welches Quotes um Variablen ersetzt, wird nun von einem escapten Quote ``\'`` abgelöst. Hätten wir das anfangs nicht ersetzt, würde an dieser Stelle später beim ``p.join()`` ein SyntaxError kommen.

~~~~ javascript
.split("\r").join("\\'")
~~~~

~~~~
<div class=\'', dollars > 5 ? "rich" : "" ,'\'>  <h1>',name,'</h1>  <p>She has ',dollars,' $.</p> </div>
~~~~

Zeile 24: Der String wird nun durch die ``with`` Anweisung davor und das Ende von ``push`` komplettiert und zusammengefügt. Heraus kommt das hier:

~~~~ javascript
with(obj){
	p.push(' <div class=\'', 
		dollars > 5 ? "rich" : "" ,
		'\'>  <h1>',
		name,
		'</h1>  <p>She has ',
		dollars,
		' $.</p> </div> ');
}
return p.join('');
~~~~

Gut, oder?

Zeile 26: Zu guter Letzt wird noch abgefragt, ob der User Daten angegeben hat oder nicht. Falls ja, bekommt er das gerenderte Template, falls nicht nur die vorkompilierte Funktion.

~~~~ javascript
return data ? fn( data ) : fn;
~~~~

