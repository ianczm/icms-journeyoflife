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

- prevent character resetting when loading the game pane

## Must Have

### Game

- update user choice selection with firebase in real time
- migrate scenarios from content document and implement calculation
- ~~update character statistics in real time with firebase (implemented)~~
- enable page-by-page navigation for each scenario in vue
    - submit answer button
    - need to figure out how to perform calculations if participants backtrack (we can enforce only one way navigation to avoid this)

---

## Should Have

### Admin Panel

_Modify: being able to create, edit, remove, reset_

- enable easy database management
    - view and modify users (needs firebase admin sdk)
        - display name
        - password
        - view uid and email (since these are read-only)
    - view and modify individual characters
    - view and modify scenarios (for easy scenario creation)
- reset switch for any database tables
    - reset all users to default state
    - return a list of randomly generated passwords for each user
    - ~~characters (implemented)~~

---

## Nice to Have

### Home

- add countdown timer to event

### Game

- add countdown timer on the game screen
- add accounting balance sheet below main scenario screen to show assets and liabilities

### Optimisations
- improve mobile friendliness