---
layout: singlepost
title: "kramdown & coderay"
keywords: "coderay, doesn't work, kramdown"
---

Heute habe ich [coderay](http://coderay.rubychan.de/) zwecks Syntax Highlighting eingeschalten. Damit Source Code nicht so aussieht.

~~~
function printlol( horse ) {
	alert( "LOL " + horse );
}
~~~

Sondern so.

~~~ javascript
function printlol( horse ) {
	alert( "LOL " + horse );
}
~~~

Problem war nur, dass es lokal super funktionierte und im Remote Repository beim Uberspace nicht. Die Lösung war zuerst nicht offensichtlich, aber dann relativ einfach: Am Uberspace war kramdown 0.14 und lokal Version 0.13.7 **und** ich nutzte folgendes Markdown für Code:

~~~ markdown
	<div class="hello">
		WORLD!
	</div>
	{:lang="html"}
~~~

kramdown 0.14 gibt die Sprache für coderay nicht mehr mit `lang="LANG"` an, sondern mit einer CSS Klasse `.language-LANG`. Die Markdownsyntax ist rückwärtskompatibel, aber nur wenn sogenannte Fenced Code Blocks verwendet werden:

~~~ markdown
	~~~ html
		<div class="hello"></div>
	~~~
~~~

Sobald auf Fence Code Blocks umgestellt wurde, sollte alles wieder hinhauen.