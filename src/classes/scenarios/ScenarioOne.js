import AbstractScenario from "../AbstractScenario.js"

class ScenarioOne extends AbstractScenario {
    constructor(character) {
        // Set current page
        this.currentPage = 1;

        // Allow multiple selection?
        this.allowMultipleSelection = false;

        // Build scenario
        super(character, currentPage, allowMultipleSelection);
    }
    // Private, to be modified
    #processAnswer() {
        // Logic for selecting operations and performing
        // calculations here.

        // For single selection scenarios, case numbers
        // are the options chosen.

        // For multiple selection scenarios, case numbers
        // are defined in the generateCases() function
        // to parse user input

        switch (this.#generateCase()) {
            case 1:
                this.characterScenario.age = 1;
                break;
            case 2:
                this.characterScenario.age = 2;
                break;
            case 3:
                this.characterScenario.age = 3;
                break;
            case 4:
                this.characterScenario.age = 34;
            default:
                throw {name: "UnmatchedOptionError", message: "Selected choices are not valid."};
        }
    }

    // Private, to be overridden by subclasses
    #generateCase() {
        // Logic for parsing user input and generating
        // a case depending on combination of selections.

        // Used in processAnswer to determine what calculation
        // to perform

        // e.g. if options 2 and 3 are selected, generate case 5

        // this.currentlySelectedOptions
    }
}

export { ScenarioOne }