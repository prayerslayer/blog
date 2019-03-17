---
title: Correct Calculator
date: 2017-11-02
tags:
  - project
---

Bugs are a long-standing problem in the software industry: [Invisible characters crash iOS Messages](https://appleinsider.com/articles/18/05/09/black-dot-unicode-bug-crashes-ios-messages-app-using-invisible-characters). [FaceTime enables microphone before the call starts.](https://www.nytimes.com/2019/01/29/technology/facetime-glitch-apple.html). [An integer underflow causes Gandhi to be super-aggressive in the original Civilization](https://www.geek.com/games/why-gandhi-is-always-a-warmongering-jerk-in-civilization-1608515/). There are many more examples.

One way to achieve code correctness that was always mysterious to me is formal verification: You prove logically that the code does what you claim. (NB: It’s not the only nor the best nor most efficient way to achieve the goal.) [Coq](https://coq.inria.fr/) is a proof assistant that can help with this. You define functions, and lemmas that define properties of that functions, which you then prove.

{{< highlight coq >}}
Fixpoint add (a b : nat) : nat :=
  match a with
  | O => b
  | (S n) => (S (add n b))
end.

Lemma addition_of_identity_element : forall (x : nat), (add x O) = x.
Proof.
  induction x.

  trivial.

  simpl. rewrite -> IHx.
  trivial.
Qed.
{{< /highlight >}}

Here we defined an addition function on the natural numbers, and proved that there exists an identity element, which you can add to the number you have and you get that number.

I wrote the math of a [basic calculator](https://prayerslayer.github.io/correct-calculator/) in Coq, then compiled it to Javascript via [OCaml](http://www.ocaml.org/) and [Bucklescript](https://github.com/BuckleScript/bucklescript).

However I must say it was not very easy. The docs are sparese and not beginner friendly, I often had the feeling I need a PHd in category theory. There are few examples of Coq on the internet, and it was a lot of trial and error. After some time I got the hang of it and could write basic proofs, but some still elude me. For instance that if you divide something by itself, you get 1 (∀ x : nat, x > 0 -> x / x = 1). It may be related to how I defined division, I don’t know. There’s also a chance that I wrote sound, but still wrong, logic. Plus, there’s a whole category of UI code that is not formally verified.

But, it was a good experience to have.
