---
title: "Licenses of popular open source software"
---

At Zalando we’re a bit late to the party and putting more effort into open source software. Until recently there was no official agenda or clear process on “how to open source”, but this changed. From now on everything we do that *can* be open source *should* be open source.

As we’re a publicly listed company we also need to make sure we get the legal side of it right. Basically this includes two questions:

* Under what license do we open source our software and
* which licenses do we allow for the dependencies of our open source software?

Regarding the latter some choices are clear in either direction whereas others are more in a gray area. They are neither clearly suitable for us nor the opposite, but we have to make a decision regardless. One way to do this is to check whether some tools we *really* want to have are using this license. If they do, the license would be permitted.

Luckily Github recently introduced the [License API](https://developer.github.com/changes/2015-03-09-licenses-api/). It does not allow to search repositories by license though (ie. “the 100 most-starred using MIT license”), but this is quite easily done.

I wrote [a simple data collector](https://github.com/prayerslayer/gh-license-scraper/blob/popular/app.js) that searches for all repositories created before March 1st, 2015 (arbitrarily chosen date) sorted by stars. It writes name, stars and license of every repository to a CSV file.[^1]

## Stop talking already

Fine!

So, (as already stated on the [Github blog](https://github.com/blog/1964-license-usage-on-github-com)) the most popular license is clearly MIT, which was used in 42 % of the projects.[^2]

![Licenses used](/media/img/gh-licenses-by-count.png)

But maybe those MIT-licensed projects are all lesser known? Nope. MIT also got 44 % of available stars.

![Licenses by million stars](/media/img/gh-licenses-by-stars.png)

Do you want to know the highest-starred project per license? Here they are:

* agpl-3.0: [getpelican/pelican](//github.com/getpelican/pelican), 4,405 stars
* apache-2.0: [docker/docker](//github.com/docker/docker), 19,815 stars
* bsd-2-clause: [Homebrew/homebrew](//github.com/Homebrew/homebrew), 21,868 stars
* bsd-3-clause: [mbostock/d3](//github.com/mbostock/d3), 35,489 stars
* cc0-1.0: [mail-in-a-box/mailinabox](//github.com/mail-in-a-box/mailinabox), 3,399 stars
* epl-1.0: [junit-team/junit](//github.com/junit-team/junit), 3,312 stars
* gpl-2.0: [torvalds/linux](//github.com/torvalds/linux), 20,334 stars
* gpl-3.0: [ansible/ansible](//github.com/ansible/ansible), 9,945 stars
* lgpl-2.1: [PHPMailer/PHPMailer](//github.com/PHPMailer/PHPMailer), 3,413 stars
* lgpl-3.0: [nicolargo/glances](//github.com/nicolargo/glances), 2,847 stars
* mit: [twbs/bootstrap](//github.com/twbs/bootstrap), 78,729 stars
* mpl-2.0: [NUKnightLab/TimelineJS](//github.com/NUKnightLab/TimelineJS), 7,318 stars
* none: [FortAwesome/Font-Awesome](//github.com/FortAwesome/Font-Awesome), 31,253 stars
* other: [joyent/node](//github.com/joyent/node), 35,156 stars
* unlicense: [vhf/free-programming-books](//github.com/vhf/free-programming-books), 37,403 stars

## You didn’t answer my question

Well, whatever. You know what? Help yourself. [Here](/media/other/gh-licenses.csv) is the CSV containing all 1050 repositories I got. Import them into a database, run `awk` on it or use the excellent [q](http://harelba.github.io/q/) like I did. Then write a blog post about it because I’m probably also interested.


## Gotchas

There are some things you need to consider when interpreting the data.

For one, Github is constantly gaining users and adding more features to make projects visible. Think news feed and the weekly trending emails. This could favor more recent projects to have more stars.

Also what you get from the License API is what Github thinks it is after applying some heuristics. There could be a popular MIT project that wasn’t detected as such because the `LICENSE` file is called `TRWYDDED` (“license” translated to Welsh). An example is Font Awesome listed under `none` whereas it actually has [multiple licenses](https://github.com/FortAwesome/Font-Awesome#license).

Finally not all of the projects are software as shown by [Font Awesome](http://fortawesome.github.io/Font-Awesome/) and [the list of free programming books](http://resrc.io/list/10/list-of-free-programming-books/).

[^1]: Fun fact: I originally wanted to fetch the first 10K results or so, but apparently the Github Search API is limited to the first 1000 results according to the error message. Somehow I still ended up with 1050 results `¯\_(ツ)_/¯`
[^2]: Github has 44 % for MIT because they exclude unlicensed projects.