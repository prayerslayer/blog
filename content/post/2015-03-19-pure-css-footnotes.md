---
title: 'Footnotes in pure CSS'
date: 2015-03-19T00:00:00Z
---

Being a web developer is as much a blessing as it is a curse. One moment you’re reading an article about the [most untradable players in the NBA](http://grantland.com/features/2015-nba-trade-value-part-3-the-final-countdown/) by your favorite basketball author, the next you’re creeping around the footnote implementation of their site and wondering if Javascript is really necessary there.[^1]

Of course it isn’t. [There](http://cssdeck.com/labs/css-panic-game) [are](http://codepen.io/ziga-miklic/pen/Fagmh) games written completely in CSS. And they are also the solution to our problem. Both examples rely on differently styled or hidden, but still accessible `input` controls.

One way to achieve the latter is to surround the `input` with a `label`, then hide the `input`. Clicking the content will trigger a click on the invisible checkbox as well:

{{< highlight html >}}
<label>
<input type="checkbox" style="display:none;" />
The actual content
</label>
{{< /highlight >}}

Inside the label there will also be the footnote content, like this:

{{< highlight html >}}
<label class="footnoteBox">
<input type="checkbox" />
<span class="footnoteBox-content">Born in 1963.</span>
<span class="footnoteBox-element">Michael Jordan</span>
</label>
{{< /highlight >}}

The key part is that the footnote content comes right after the input so that we can use the CSS adjacent sibling selector `+`.

{{< highlight css >}}
/_ hide checkbox in any case _/
.footnoteBox > input {
display: none;
}

/_ hide content by default _/
.footnoteBox > .footnoteBox-content {
display: none;
}

/_ show when checkbox is checked _/
.footnoteBox > input:checked + .footnoteBox-content {
display: block;
position: absolute; /_ don’t interrupt the text flow _/
}
{{< /highlight >}}

What’s left is the styling of the footnote box as you please. [Here](http://codepen.io/anon/pen/RNERdX) is a working example. The familiar superscript number can be achieved with an `after` element.

## Pros

- [No code](http://blog.codinghorror.com/the-best-code-is-no-code-at-all/).
- Multiple footnote boxes can be visible at the same time (could also be a disadvantage when they overlap though).
- A click anywhere inside the box hides it again. You could even create a fake close button without having to maintain code for it.

## Cons

- The markup has to be generated—e.g. from your favorite markdown parser—and it’s not only quite specific, but also ugly and useless without the accompanying CSS. I doubt your favorite markdown parser would accept a PR, but maybe you could [use your own implementation](https://github.com/TheFox/jekyll-bigfootnotes).
- Clicking outside the box won’t close it. This would be better and more expected UX—thanks, [Bootstrap modals](http://getbootstrap.com/javascript/#modals).

[^1]: Of course footnotes at the end of the document don’t need Javascript. But jumping back and forth is distracting so most of the time there’s also a tooltip of sorts.
