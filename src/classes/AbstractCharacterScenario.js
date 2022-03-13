import { Character } from '/src/classes/Character.js';
import { getFirestore, doc, setDoc } from "firebase/firestore"; 

// Usage Flow
// 1. create new scenario, constructing with character as the one to be modified
// 2. listen for options selected via updateSelectedOptions()
//      - perform realtime database update
// 3. listen for answer submission via submitAnswer()
//      - check if multiple options are selected
//      - processes selected options --> calculation done here
//      - updates character and history
// 4. always listen for firebase updates e.g. allowMultipleSelections

class AbstractCharacterScenario {
    constructor(character, currentPage, allowMultipleSelection) {

        // Reference the original character object
        this.characterOriginal = character;

        // Scenario current page
        this.currentPage = currentPage;
        // Update current page of character
        this.characterOriginal.setPage(currentPage);

        // Make a copy of character and perform
        // calculations here first before updating original
        this.characterScenario = new Character(JSON.parse(JSON.stringify(this.characterOriginal)));

        // User selected options
        this.selections = [];
        this.allowMultipleSelection = allowMultipleSelection;

        // Initialise firebase
        this.db = getFirestore();

        // Create instance if does not already exists
        this.createOrUpdateDatabaseInstance();
    }

    // Public, onClick event
    updateSelectedOptions(optionNumber) {
        // To update the database as participants select options
        // to be displayed to others in real time

        if (this.selections.includes(optionNumber)) {
            // toggle behavior: deactivate selection if already active
            this.selections = this.selections.filter((option) => {
              return option != optionNumber;
            })
          } else {
            // normal behavior, add option
            if (this.selections && this.allowMultipleSelection) {
              // if there is another selection already, check if ms is enabled
              this.selections.push(optionNumber);
            } else {
              // if not, set first element to optionNumber
              this.selections[0] = optionNumber;
            }

            // Update database with options
            // console.log(this.selections);
            this.createOrUpdateDatabaseInstance();
          }
    }

    // Public, onClick event
    submitAnswer() {
        // Perform multiple selection validation
        try {
            if (!this.canProceedWithMultipleSelection()) {
                throw {
                    name: "MultipleSelectionError",
                    message: "You may only choose one option."
                }
            } else if (!this.selections) {
                throw {
                    name: "NoSelectionError",
                    message: "Please choose at least one option."
                }
            }

            // Proceed with answer processing
            this.processAnswer();
            // Update character upon submit after perfoming
            // logic and calculations
            this.characterOriginal.updateCharacterState(this.characterScenario);
            this.characterOriginal.updateCharacterState(this.characterScenario);
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
        return this.allowMultipleSelection && this.selections.length > 1;
    }

    // Private, create new database instance
    async createOrUpdateDatabaseInstance() {
        await setDoc(doc(this.db, "character_scenario", `_1`), {
            selections: this.selections,
        });
    }
}

export { AbstractCharacterScenario };