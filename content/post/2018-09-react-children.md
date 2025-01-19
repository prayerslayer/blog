---
title: Inspecting React Children
date: 2018-09-01T00:00:00Z
---

Suppose you write a frontend framework in React, like Bootstrap. (If it’s for the web or react-native doesn’t matter for the argument.) There are components for different text styles (MediumText, SmallText…), for popular control elements (Dropdown, Button…) and so on. You want this to be modular and composable, so you pass a different text component to the Button instead of setting a size property on it. After all, the button size depends only on the content, why would you have a large button with small text inside?

{{< highlight jsx >}}
<Button>
<SmallText>I am a small button</SmallText>
</Button>
{{< /highlight >}}

But now there’s a problem. A button with small text should have less padding than with larger text. How does it know without a property?

One way to solve it is to pass a property [CITATION NEEDED]:

{{< highlight jsx >}}
<Button size="sm">
<SmallText>I am a small button</SmallText>
</Button>
{{< /highlight >}}

But that’s redundant and it might get out of sync with children in the future. E.g. someone does a search+replace refactoring and you have size `sm` on the button but a LargeText inside. Oops.

You could pick the text component based on a property (there are different implementation versions of the same principle, I won’t list all).

{{< highlight jsx >}}
<Button size="sm">I am a small button</Button>
{{< /highlight >}}

{{< highlight jsx >}}
import React from "react";
import { SmallText, Text } from "./Text";

function Button({ size, children }) {
const isSmall = size === "sm";
const TextComponent = isSmall ? SmallText : Text;
const style = { padding: isSmall ? 5 : 10 };
return (
<button className="button" style={style}>
<TextComponent>{children}</TextComponent>
</button>
);
}
{{< /highlight >}}

That’s safer with regards to future regressions, but you lose flexibility. How would you pass properties to the text component now? (Adding a textProps property always feels wrong to me, but yeah that works.)

Now, there’s a third way. Remember that React necessarily has to process your component tree from the bottom up, ie. render functions of children are called prior to their parents’. Children are one or many React nodes[^1], which means either React elements or functions, strings and so on. (See [this excellent post](https://mxstbr.blog/2017/02/react-children-deepdive/) on React children if you want to know more.) React elements are regular objects with some keys:

- type: A string for built-ins ("div") or a function/class for custom components.
- props: An object holding properties of that element.
  There are more, like key and ref, but the two above are the most relevant now.

Assuming for simplicity that the Button takes a single child, you can inspect the child and change what Button returns based on that. The same principle works with multiple children, but you need to decide how the button should behave when it contains both Text and SmallText. (Comparing type has one gotcha that is discussed at the end.)

{{< highlight jsx >}}
import React from "react";
import { SmallText } from "./Text";

function Button({ children }) {
const isSmall = children.type === SmallText;
const style = { padding: isSmall ? 5 : 10 };
return (
<button className="button" style={style}>
{children}
</button>
);
}
{{< /highlight >}}

If the SmallText/Text distinction was too contrived for you, you can achieve the same thing if your components are used like this:

{{< highlight jsx >}}
<Button>
<Text size="sm">I am a small button</Text>
</Button>
{{< /highlight >}}

…because you can inspect the props just as well as the type of a React element. (Live demo)

{{< highlight jsx >}}
import React from "react";
import { SmallText, Text } from "./Text";

function Button({ children }) {
const isSmall = children.props.size === "sm";
const style = { padding: isSmall ? 5 : 10 };
return (
<button className="button" style={style}>
{children}
</button>
);
}
{{< /highlight >}}

Now, is this a great technique? Let’s try to answer it for ourselves.

Is this bad for React, the library, and decreases render performance? I didn’t measure, but I don’t see a reason why it would be. children is just another object passed to us that we inspect, so there is no additional cost of accessing it. Since we don’t alter children with React.cloneElement[^2], or by changing a ContextProvider value or similiar, there shouldn’t be additional CPU cycles necessary.

Is this bad for the spirit of React: Declarative UI programming, unidirectional data flow and all? I guess there’s a moment of surprise for many developers because this pattern isn’t common and you don’t know what Button will do just by looking at that component alone. That said, if the changes affect only the Button — which they should — then you should quickly see what’s going on.

Is this bad for maintainability? There quite some types of React nodes we didn’t handle. The implicit assumption of Button is to get a custom component, possibly with size property, so it would probably throw an error if passed e.g. a string. If you write an open-source project or are in a very large team you should add extensive checks for these issues, and will probably write a utility function to do it. Otherwise I think the error message from React is good enough to pinpoint the problem.

You could also make the argument that this technique relies on React internals, as it breaks if the shape of a custom React element changes, which is generally a bad thing. Then again I consider that unlikely for the foreseeable future. It seems like lots of effort with little gain for them, and this shape is only half-internal, if anything, as parts of it are used for createElement.

And explicit is better than implicit, so the result of render should ideally only depend on the props that were passed. children are technically a part of props, but passed separately, so at least I usually don’t think of them as such. This means there’s additional mental effort if you touch code around that Button.

So it’s not great, but also not that bad? I personally think the technique is okay; it has higher maintainability cost than the textProps approach, but the JSX looks nicer (to me) and it can be more practical in rare situations. E.g. when there are components that should be used together, and there’s a property both need, and it should be in sync all the time, and you don’t want to repeat yourself. Probably I wouldn’t build a whole UI library on this, but it’s a nice trick to know.

Also, here’s the heads-up I promised: If you inspect the type and want to compare it to custom components (example below), and are using react-hot-loader, then you need double the code. The hot-loading thing wraps all your components in proxies, so the comparison will fail in development.

{{< highlight js >}}
function MyComponent() {
return null; // doesn't matter
}

function MyInspectingComponent({ children }) {
const child = React.Children.only(children);
switch (child.type) {
case MyComponent:
// Never reached with react-hot-loader
return "Hi";
default:
return "Ho";
}
}
{{< /highlight >}}

[^1]: I’m not sure if it’s an official term, but it’s ReactNode in the Typescript definitions for React, so I’ll go with that.

[^2]: That works fine by the way, with cloneElement there are no infinite loops. React clones the children, but doesn’t process their parent again afterwards. Fine as in no accidental infinite loops.
