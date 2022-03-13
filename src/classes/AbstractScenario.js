import Character from 'Character.js';

// Usage Flow
// 1. create new scenario, constructing with character as the one to be modified
// 2. listen for options selected via updateSelectedOptions()
//      - perform realtime database update
// 3. listen for answer submission via submitAnswer()
//      - check if multiple options are selected
//      - processes selected options --> calculation done here
//      - updates character and history

class AbstractScenario {
    constructor(character, page, allowMultipleSelection) {
        // Reference the original character object
        this.characterOriginal = character;

        // Scenario current page
        this.currentPage = page;
        // Update current page of character
        this.characterOriginal.setPage(currentPage);

        // Make a copy of character and perform
        // calculations here first before updating original
        this.characterScenario = new Character(JSON.parse(JSON.stringify(this.characterOriginal)));

        // User selected options
        this.currentlySelectedOptions = [];
        this.allowMultipleSelection = allowMultipleSelection;
    }

    // Public, onClick event
    updateSelectedOptions(optionNumber) {
        // To update the database as participants select options
        // to be displayed to others in real time
        this.currentlySelectedOptions.push(optionNumber);

        // Remove duplicates
        this.currentlySelectedOptions = [...new Set(this.currentlySelectedOptions)]

        // Update database with options
        // ..
    }

    // Public, onClick event
    submitAnswer() {
        // Perform multiple selection validation
        try {
            if (!canProceedWithMultipleSelection()) {
                throw {name: "MultipleSelectionError", message: "You may only choose one option."}
            }

            // Proceed with answer processing
            processAnswer();
            // Update character upon submit after perfoming
            // logic and calculations
            this.characterOriginal.updateCharacterState(this);
        } catch (e) {
            // Somehow render this to HTML
            alert(e.name + " " + e.message);
        }
    }

    // Private, to be overridden by subclasses
    processAnswer() {
        // Logic for performing calculations
    }

    // Private, to be overridden by subclasses
    generateCase() {
        // Logic for parsing user input and generating
        // a case depending on combination of selections.

        // Used in processAnswer to determine what calculation
        // to perform

        // e.g. if options 2 and 3 are selected, generate case 5

        // this.currentlySelectedOptions
    }

    // Private, validation check
    canProceedWithMultipleSelection() {
        return !this.allowMultipleSelection && this.currentlySelectedOptions.length > 1;
    }
}

export { AbstractScenario };