---
layout: singlepost
title: "Future of Markdown"
---

[Jeff Atwood](http://www.codinghorror.com/blog/2012/10/the-future-of-markdown.html):

> I realize that the devil is in the details, but for the most part what I want to see in a Markdown Standard is this:
> 
> 1. A standardization of the existing core Markdown conventions, as documented by John Gruber, in a formal language specification.
> 2. Make the three most common real world usage "gotchas" in Markdown choices with saner defaults: intra-word emphasis (off), auto-hyperlinking (on), automatic return-based linebreaks (on).
> 3. A formal set of tests anyone can use to validate a Markdown implementation.
> 4. Some cleanup and tweaks for ambiguous edge cases that exist in Markdown due to the lack of a formal specification.
> 5. A registry of known flavor variants, with some possible future lobbying to potentially add only the most widely and strongly supported variants (I am thinking of the GitHub style code blocks which are quite nice) to future versions of Markdown.

Vor allem Punkte 1 und 3 sagen mir sehr zu. Die Markdown-Implementierungen sind nicht 1:1 austauschbar, unterscheiden sich in Details. Mitte September stellte ich mein Jekyll von [Maruku](http://maruku.rubyforge.org/) auf [kramdown](https://github.com/gettalong/kramdown) um, hatte was mit dem oEmbed Plugin zu tun. Ich dachte, das tauscht man mal eben aus und dann läuft alles wie gewohnt weiter. Nope. kramdown möchte im Gegensatz zu Maruku und entgegen der Markdown Spezifikation von John Gruber eine Leerzeile vor Blockquotes und ein Leerzeichen nach dem > für ein Zitat, wenn es den HTML Code korrekt ausgeben soll.

Ach ja und URLs per Default automatisch zu erkennen und Links zu erzeugen (Punkt 2), wäre wirklich hilfreich. Spart massiv Tipparbeit.