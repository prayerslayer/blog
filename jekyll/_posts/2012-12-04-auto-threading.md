---
title: "Auto-Threading"
layout: singlepost
---

[Tim Kellogg](http://developinthecloud.drdobbs.com/author.asp?section_id=2284&doc_id=255275):

> As a programmer, have you ever had to work with multithreaded code? It's horrible. You might as well give up on unit testing and quality; concurrency bugs usually aren't very reproducible.

Absolut. Hinzu kommt die ganze Logik zur Synchronisation bzw. Kommunikation, wenn nötig. Viele träumten davon, dass der Compiler diese Aufgaben übernehmen könnte. [Das geht jetzt](http://research.microsoft.com/pubs/170528/msr-tr-2012-79.pdf).

> The result is a C#-like language that can be written normally (single-threaded), which the compiler auto-threads where it deems it beneficial. This is extremely interesting. It's a game changer. It's also real. (...) The team claims it's written millions of lines of code, creating a web server, an MPEG decoder, and many other applications.

Fuck yeah!

Okay, wo Parallelität ein Feature ist (z.B. [zeitbasierte Samplingalgorithmen](https://github.com/prayerslayer/TUD_ADBS_SS12_Timebased)), wird der Compiler nicht alles machen können. Aber...

Fuck yeah!