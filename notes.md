
buttons on card review view:
1. the buttons always have the same ratio
2. the buttons always have the same distance between them
3. the buttons side by side don't extend to far out the sides, except if the screen is narrow. see rule 1, it should suffice
4. the button divs on the top and on the bottom have the same width.

when clicking "Show Answer", the button disappears and the confidence buttons appear

actually in that view all elements should have the same width, which might not be 100% depending on the screen size
-> wrap all of them into one div

I'd like to use some kind of card-swiping animation, so organizing cards as <tr> sounds reasonable and easy. That would mean I don't need to think about what to do to display the next card. However, two things:
1. That means all the cards are decided once, at the beginning of the review
2. Given an HTMl, how do I trigger all the state changes about hard-good-easy?
<https://codepen.io/RobVermeer/pen/japZpY> looks pretty good. In this example, when you swipe right the HTML element gets an extra "love" class, if you swipe left it's "nope"

I keep thinking that Svelte would work better, but i think it's just that the current state is not easy to understand


So there seems to be a tug-of-war between two extremes:
- Keep display separate from logic.
- Make design intrinsically tied to logic. e.g. when a variable changes the display gets updated automatically.


Since I don't really get the codebase or Typescript, I feel like changing frameworks would be preferable. however, i'm sure i'd have just as many issues with another new framework.

I was puzzled about the `dueDates` argument of the `schedule` function. It seems that this is gives you the number of cards that are due in a certain amount of days. This is used to make the review schedule more balanced, as we might not want to have 5 cards to review one day and 15 cards the next.
Still don't quite understand what that part of the function does, though.

Do sibling cards have the same schedule? how could you store it in the obsidian vault and have them have different schedules? I guess they don't
