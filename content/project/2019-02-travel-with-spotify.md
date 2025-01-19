---
title: 'Travel with Spotify'
date: 2019-02-15T00:00:00Z
---

When I travel I like to get a feeling for the music from the place I will visit. Who are the romantic singers one should know? What was the popular boyband in the 90s? For a recent trip I copied artist names from a Wikipedia page into the Spotify search, and that clearly doesn't scale.

##### Prior Art

There are several playlists from Spotify for kind of this purpose ("The Needle"), but they give me popular music in that place, ie. what people listen to. It's not necessarily _from_ there nor a good summary.

Then there are playlists from [Every Noise](http://everynoise.com/) that may come close, like [Finnish EDM](http://everynoise.com/engenremap-finnishedm.html), but they are grouped by genre. Someone from Italy could make Finnish EDM by accident and show up in that playlist.

##### The Thing

That's why I wrote this: https://prayerslayer.github.io/travel-with-spotify/. You log in with your Spotify account, then paste the Wikipedia page of the place you'll visit, and it will create a playlist for you!

It works by querying [DBpedia](https://wiki.dbpedia.org/) for musicians from that place, then searching Spotify for those. You can control the size of the playlist by desired total length (in hours) and how many top tracks of an artist should be added.

Github Repo: https://github.com/prayerslayer/travel-with-spotify
