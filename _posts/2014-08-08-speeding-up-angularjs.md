---
title: "Speeding up AngularJS"
---

[Todd Motto](http://www.binpress.com/tutorial/speeding-up-angular-js-with-simple-optimizations/135):

> The key concept behind these performance considerations is reducing the number of ``$$watchers`` inside Angular to improve the ``$digest`` cycle’s performance, something you’ll see and hear more of as you continue working with Angular. These are crucial to keeping our application state fast and responsive for the user. Each time a Model is updated, either through user input in the View, or via service input to the Controller, Angular runs something called a ``$digest`` cycle.

Deckt sich mit meinen Erfahrungen bisher. Wer Angular 1.3 noch nicht nutzen kann/darf, sei als Ersatz für ``::value`` auf [bindonce](https://github.com/Pasvaz/bindonce) verwiesen.