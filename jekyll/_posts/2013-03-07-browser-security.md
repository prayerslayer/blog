---
title: "Browser Security"
layout: singlepost
---

[Browser Security Case Study](http://queue.acm.org/detail.cfm?id=2399757):

>*GN-N*: What else concerns you about HTML5?
>
>*JG*: Are you familiar with the use of session storage as an alternative to cookies? Basically, some Web programmers are starting to put actual executable JavaScript code into local storage in addition to data. That way, when the page loads, they can just eval that code directly rather than having to make a network call, because that gets them a performance win.
>
>Of course, the bad guys find this attractive. If they cross-site script the site that loaded that code, they'll be able to backdoor the application and thus enjoy permanent access to any client that thing happens to get loaded onto, since that backdoor code will always run.

Es geht auch um SSL CAs, Convergence, Do Not Track und Virenscanner im Browser.