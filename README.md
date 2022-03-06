# ICMS Rag to Riches Website

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

### Game (User)

- Sign in page will display the team's respective game state
    - Multiple users sign in with the same credentials
- Display scenarios page-by-page
    - Do not allow to proceed before question is complete
- Display game timer
- Server-side calculation in order to allow real-time updates for
    - Credit score
    - Capital score (given initial capital)

### System (Admin)

- Multiple users from a group should be able to answer
    - Would be good to display current selection made by another user
- Identify each team uniquely and securely through a login
    - Auto-generate credentials on the day before
- Send updates through Slack of teams' choices and progress
- Per-team game timer (2 minutes per question)
    - Will prompt for answer but will not skip question
- Admin dashboard
    - Show real-time updates and statistics
    - Allow overriding of values
    - Master switch to reset game state
    - Backup system to register game states at different times
    - Start/stop game timer