# ICMS Journey of Life Webgame

Rags to Riches is an event organised by the International Council of Malaysian Scholars in collaboration with Maybank. The event is about raising financial literacy among the Malaysian Youth through learning about financial planning.

## Game Details

Participants will participate in a "credit score simulation" game, where they will be given a prompt and options to select from. Their goal is to make the financially-wise choice in order to grow their capital and improve their credit score.

- Early questions would start off simple with obvious answers.
- Later questions would target the grey areas of financial planning where the answer is not always obvious in the short term, but has long term impacts.
- A credit score is maintained throughout the game that changes according to their borrowing/lending activities.
- Players start with **initial capital** that will change according to their buying/selling activities.

-------------------------------------------------------------------------------

## Requirements

The website serves as the interface where participants get to interact with various elements of the game.

---

## Absolutely Urgent

- [DONE] prevent character resetting when loading the game pane
- [DONE] add character id as a property to Character
- [WIP] realign calculations so that we don't get stress to 100% after first two scenarios lmao

## Must Have

### Game

- [DONE] update user choice selection with firebase in real time
- [DONE] game needs to figure out if character is on the outcome screen or not to sync with teammates
- [DONE] update character statistics in real time with firebase
- [DONE] enable page-by-page navigation for each scenario in vue
- migrate scenarios from content document
    - [DONE] update character's currentpage property
    - [DONE] submit answer button
    - [BACKLOG] need to figure out how to perform calculations if participants backtrack (we can enforce only one way navigation to avoid this)
- [WIP] add accounting balance sheet below main scenario screen to show assets and liabilities
- [WIP] implement per-scenario calculation
- [WIP] add paragraphs to scenario (allow admin to add scenarios)
- [DONE] store previous answer / accountitems in character to execute complex scenarios (e.g. if they chose to buy a bungalow, then in this question their tax will be higher)
    - access via Character.previousOption
- [WIP] networth very negative at the start

### Optimisation
- [WIP] improve laptop friendliness (font weight)
- [WIP] progress bar for how many questions left

---

## Should Have

### Admin Panel

_Modify: being able to create, edit, remove, reset_

- enable easy database management
    - [WIP] view and modify scenarios (for easy scenario creation)
    - [BACKLOG] view and modify users (needs firebase admin sdk)
        - display name
        - password
        - view uid and email (since these are read-only)
    - [BACKLOG] view and modify individual characters
- reset switch for any database tables
    - [DONE] reset all characters to default state
    - [DONE] remove all selections
    - [WIP] reset current character to default state
    - [BACKLOG] return a list of randomly generated passwords for each user

---

## Nice to Have

### Home

- [BACKLOG] add countdown timer to event

### Game

- [BACKLOG] add countdown timer on the game screen

---