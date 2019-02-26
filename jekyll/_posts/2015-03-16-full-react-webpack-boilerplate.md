---
title: "A full React/Webpack boilerplate"
---

[Webpack](https://github.com/webpack/webpack) calls itself a “module loader”. It does load your Javascript modules, in whatever format they may be. But it also loads your static assets like stylesheets or images.

This is nothing inherently new, even [require.js](http://requirejs.org/docs/faq-advanced.html#css) did this. But Webpack can do even more: I love two things about it.[^1] First its modularity and vast amount of [loaders](http://webpack.github.io/docs/list-of-loaders.html). It probably supports what you’re using now. Secondly its Hot Module Replacement API ([HRM](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html)). Webpack can swap your modules **while they are running**.

If you’re like me, you’re thinking “yeah, whatever, this is just some flavor of [live reload](http://livereload.com/).” It’s not. This is different.

{% oembed https://vimeo.com/100010922 %}

It doesn’t do a page refresh like live reload. Remember when working with a large/complex/badly designed app you had to click your way through the thing you’re developing for like 10 seconds? Every 30 seconds? [React Hot Loader](https://github.com/gaearon/react-hot-loader) keeps your application state while it swaps your modules. This is insanely useful and time-saving.

And it doesn’t end there. While setting up a new project for work I decided to go all-in on this hot replacement hotness. [Here](https://github.com/prayerslayer/yourturn/tree/f66c286b2bf2ba242970f23724cfb70a413fa6d0) is the commit where I got everything to work, someone might consider this a boilerplate.

So what does it do?

* React with ES6
* Webpack, obviously
* React Hot Loader
* [SCSS](http://sass-lang.com/) with hot replacement[^2]
* [BrowserSync](http://www.browsersync.io/)
* Tests with [Karma](http://karma-runner.github.io/0.12/index.html) (currently launching Chrome because there are no binaries of [PhantomJS 2 for Linux](http://phantomjs.org/download.html) yet)

What is missing? I still have to look into how you can build different bundles for production. Actually everything related to “running in production”, especially Source Maps would be good. But for the first steps a single bundle is probably alright.

Anyways, please try this out, it is amazing. As [James Long](http://jlongster.com/Backend-Apps-with-Webpack--Part-I) put it:

> You’ll never look back after experiencing this.

[^1]: And I despise only one thing that is the huge amount of configuration options. But I bet there will be more tutorials and written documentation in the future.
[^2]: If you want to use LESS you can, there is a [loader](https://github.com/webpack/less-loader), but apparently you will have to use a 1.x version of [LESS](https://www.npmjs.com/package/less) with it.