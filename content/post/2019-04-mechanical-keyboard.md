---
title: My first mechanical keyboard, and how you can get one too
date: 2019-04-02T00:00:00Z
---

People in my Twitter stream would post pictures of their workplace every once in a while. More often than not, the picture would feature a fancy keyboard. I would then search the internet about it, get intringued, and leave it at that. But recently I went for it.

I’ll first list some advantages of custom mechanical keyboards, and then do my best to walk you through the process of getting your own. For rookies this is harder than you think.

So why would you want one?

First, because you can control every piece of hardware inside it. There’s a multitude of of [switches](https://www.pcgamer.com/best-mechanical-switches-for-gaming/) to choose from, they differ in how hard you need to press them, in their haptic feedback, in their noisiness, and other things. There’s an endless supply of [keycaps](https://kbdfans.cn/collections/keycaps) available. You can choose the PCB based on which layout, connector or LEDs you like. You can change any part of the whole to make it _your_ keyboard.

Second, programmable keyboards are a thing. Tools to create a custom firmware, which you then flash onto the keyboard’s processor, exist. [QMK](https://docs.qmk.fm/#/features) being the most popular one. I really recommend to skim the linked features page. You can do basically anything, but remapping keys to different layers is probably the most basic and useful function. (E.g. I map arrow keys to IJKL to reduce hand movement.)

Third, if you build it right it will last basically forever. If individual parts break you can replace them relatively easy.

Let’s get to the part where you choose a keyboard! These are the decisions you have to make:

Which **size** is it? [There’s](https://www.keyboardco.com/blog/index.php/2017/08/full-size-tkl-60-and-more-a-guide-to-mechanical-keyboard-sizes/) 100% (F-row and numpad), tenkeyless or TKL (no numpad), 75% (no or reduced arrow keys + PageUp area), 65% (no F-row, possibly with arrow keys), 60% (no arrow keys) and 40% (no number keys).

{{< figure src="/media/keyboard/keyboards.jpg" link="https://www.reddit.com/r/MechanicalKeyboards/comments/65kvvq/photos_1800_family_album/" >}}

Which **layout** is it? There’s basically only ANSI and ISO, and they differ in the Enter and left shift key. ANSI is far more popular so you better get used to it.

{{< figure src="/media/keyboard/iso-vs-ansi-min.png" link="https://wooting.helpscoutdocs.com/article/39-how-to-create-a-wooting-keyboard-in-your-language" >}}

Which **switches** do you want? They are responsible for the “feel” of your keyboard. There’s three different classes, Cherry MX and MX-style (like e.g. Gateron) being the most popular. The color (blue, red, brown...) is like with resistors, ie. it’s not only a visual choice: Red MX switches are linear and easy to click, while blue are clicky and need to be pressed harder.

{{< figure src="/media/keyboard/switches.jpg" link="https://www.pcgamingrace.com/blogs/guides-resources/mechanical-keyboard-switch-buying-guide" >}}

Which **keycaps**? There’s a couple of different styles that differ in height and profile, but since that’s the easiest part to change, it’s not a big deal to go with any in the beginning.

{{< figure src="/media/keyboard/keycaps.jpg" link="https://kotaku.com/swapping-keycaps-is-the-key-to-having-a-pretty-keyboard-1794603307" >}}

Which **case**? Your PCB needs to fit into it, pay attention to the screw holes and connector position. The choice is pretty much in color and material (aluminium and plastic).

{{< figure src="/media/keyboard/case.jpg" link="https://kbdfans.cn/products/in-stocktofu-65-aluminum-case" >}}

Which **connector** do you want? 40% keyboards sometimes come with Bluetooth, I assume for mobility. Larger boards pretty much don’t. Most have a Mini USB-B port, some come with USB-C.

Do you need **LEDs**? Some boards come with LEDs installed, they might be RGB or a single color. Others have pins so you can solder them yourself later. I assume there are some that don’t have LED pins.

Do you mind **soldering**? If you do, you either have to buy an assembled keyboard, or find a shop that offers assembly service (e.g. [KBDfans](https://kbdfans.cn/)), or pick a DIY kit / individual parts with hotswap support. Hotswap means there are switch mounts already soldered on the PCB, and you plug switches into those.

Do you want **QMK support**? You do if you want to program your board. Here’s a [list of supported PCBs](https://qmk.fm/keyboards/). There’s also a chance that your board comes with a proprietary software that can do a subset of QMK, e.g. Vortex and 0.01 are brands that do this.

Now that you decided everything, let me break it to you: **This keyboard does not exist**. You will make compromises. For instance, I decided that I want QMK, hotswap mounts and USB-C, in that order, and everything else is negotiable.

Okay, you know what you want and what you’re willing to trade. Now is the time to **look for candidates**. While it is a bit daunting at first, the best resource you’re going to find is [/r/MechanicalKeyboards](https://www.reddit.com/r/MechanicalKeyboards/). They have an extensive [wiki](https://www.reddit.com/r/MechanicalKeyboards/wiki/index) with shopping guide and you can find opinions on boards by [googling on reddit.com](https://www.google.com/search?source=hp&ei=X1ekXNPFE8arrgTVxpSAAw&q=site%3Areddit.com+dz60&btnK=Google+Search&oq=site%3Areddit.com+dz60&gs_l=psy-ab.3...1541.5004..5668...0.0..0.136.1996.16j5......0....1..gws-wiz.....0..0j0i10.Lk1Bm-HjL6I). You’ll find that no shop will list all data you want to know about a piece, and the only way to find out is to order and look at it. Luckily other people probably did that, and posted a video on youtube.

{{< youtube EkGglH8gJFs >}}

As for actually **buying**: If you’re in the EU like me, the shops with most things I found are [candykeys.com](https://candykeys.com/) and [mykeyboard.eu](https://mykeyboard.eu/). They have the most things because they buy from smaller shops/manufacturers and resell it. Of course you should check shops outside the EU too, just keep in mind that customs and tax may be added to your order. A list of all shops is available, of course, in the subreddit wiki.

A couple of tips at the end, they might be obvious:

- You will make mistakes, so better order a bit too many of the cheap parts (switches, stabilizers...)
- Ask the shop before you order, if you’re unsure about something
- Triple-check if your basket contains everything you need

Here’s my keyboard, it’s a KBD6x v2 with Gateron silent red switches in an aluminium case:

{{< figure src="/media/keyboard/keyboard.jpg" >}}

And here’s what I did wrong:

It has two USB-C connectors (no, I don’t know why, most cases I saw have the hole on the left, so 🤷‍♂️), and they extend beyond the PCB a bit, so I was worried that it won’t fit in the case. It does, but if you look closely you see it’s slightly tilted. I tried to file off the right USB connector but no avail. Speaks to the manufacturing quality that I didn’t rip it off.

It also turned out that this specific PCB fits very few cases (something I would have found out on reddit), and for this case there is a misaligned screw hole in the middle that I had to file off and can’t use. Not a super big deal, but annoying.

The product page had a comment section underneath, which mentioned that it has QMK support. It turned out that QMK support is only for v1 of the board, and I ordered v2, so no QMK for me, even though it was my #1 criterium. This information was also available somewhere in /r/MechanicalKeyboards. I might exchange the PCB for something like a DZ60 in the future, or build another keyboard with QMK.

I think I semi-broke the spacebar stabilizer, but I don’t have another one and didn’t want to wait again, so I put it in and it’s suspicously noisy. It also might have to do with this lubing thing I never even bothered looking up. Also the Enter key is somewhat misaligned, not sure what’s up with that. And I ordered a bunch of 1U and 1.5U keycaps in colors to mark my function keys, but Caps Lock is one of them and it’s 1.75U wide. Shrug emoji.

So yeah, next time I plan to do better and I hope you make it on your first try!
