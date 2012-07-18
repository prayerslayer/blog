---
layout: singlepost
title: "Mit MacOS und TrueCrypt NTFS schreiben"
---

Um NTFS von MacOS zu beschreiben, verwendet man [NTFS-3G](http://sourceforge.net/projects/ntfs-3g/) und [OSXFuse](http://osxfuse.github.com/). Ist die Partition aber mit TrueCrypt verschlüsselt, wirft NTFS-3G einen Timeout-Fehler.

[Dieser Post](http://fernandoff.posterous.com/ntfs-write-support-on-osx-lion-with-ntfs-3g-f) to the rescue. Habe ich gerade ausprobiert, funktioniert wie beschrieben. Epischer Gewinn!