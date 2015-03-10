---
title: "A modern Javascript Setup"
---

So, well. I'm always uncertain whether or not I should write in English. Usually laziness wins over "the right thing" and that slightly weird feeling. However this time I figured it might actually help real people—it certainly would've helped me to read something similiar.

Earlier this year [a blog post](http://glenmaddern.com/articles/javascript-in-2015) by Glen Maddern made the round on the internet where he introduces a modern Javascript setup. If you don't know it you should really watch the video.

{% oembed https://www.youtube.com/watch?v=iukBMY4apvI %}

I was fascinated. Completely sold. "This is **it**", I thought. I was gonna use it the next time I could.

Okay, so, but how do you make it work with React and tests and what not?

## JSPM

> jspm is a package manager for the SystemJS universal module loader, built on top of the dynamic ES6 module loader

    npm install jspm --save-dev

The first issue I ran into was that JSPM uses the Github API. If you're not authenticated you will run into rate limits. JSPM warns you about this though. In case you have many dependencies on projects hosted on Github, you should create an [Access Token](https://github.com/settings/applications) for JSPM and configure it with `jspm config github`.

The second was that my `jspm install` failed randomly at first, then more reliably as I added dependencies. But only at home. Sadly, I never figured it out.

I also had a hard time understanding the difference between SystemJS and JSPM because they are tightly coupled—you can't use JSPM without SystemJS. For the record: JSPM is the part that pulls your dependencies on your hard disk. SystemJS is the part that knows where and how to load them.

## SystemJS

> Universal dynamic module loader - loads ES6 modules, AMD, CommonJS and global scripts in the browser and NodeJS. Works with both Traceur and Babel.

When you do a `jspm install something`, JSPM configures SystemJS automatically for you. However sometimes you need to change something yourself. The SystemJS configuration has basically three parts:

* **paths**: Where to load the modules? E.g. `"myapp/*": "src/app/*.js"` tells SystemJS to look for `src/app/user/user-details.js` when you do a `import "myapp/user/user-details"`.
* **map**: Here you can give meaningful names to your modules and also pass in dependencies. **TODO EXAMPLE**
* **meta**: This is basically like RequireJS shims. You can define a module format and/or global dependencies. **TODO EXAMPLE**

## React

    jspm install react=npm:react

React is all the rage right now, I won't go into details here. Since JSPM comes with an ES5 transpiler, you can write Javascript how it was meant to be:

    import React from 'react';
    export default React.createClass({
        render: () => <div>Hello world</div>
    });

Isn't that marvelous?

When you install the newest beta of React, you can even use JS classes for the same thing:

    import React from 'react';
    export default class Hello extends React.Component {
        render: () => <div>Hello World</div>
    }

However the `<div>...</div>` part is JSX and we need additional tooling for that. Except not! There is a JSX loader plugin for SystemJS: `jspm install jsx`. Then import your components like so:

    import Hello from 'myapp/hello.jsx!';

Now for the elephant in the room.

## Testing

Yes, tests! It helps to have testing in mind, at least, because in my experience an architecture that is easily testable is the better architecture. Less dependencies, less things to mock in tests, less things to refactor.

karma-jspm
karma-mocha
karma-chai

proxies

## Linting

eslint, but no modules yet