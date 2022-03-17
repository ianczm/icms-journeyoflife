import { Character } from "../character/Character";
import { Scenario } from "./Scenario"


// Page settings here
// Allow multiple selection?
const allowMultipleSelection: boolean = false;


class ScenarioOneA extends Scenario {
    
    constructor(character: Character, currentPage: number) {
        // Build scenario
        super(character, currentPage, allowMultipleSelection);
    }
    // Private, to be modified
    processAnswer(): void {
        // Logic for selecting operations and performing
        // calculations here.

        // For single selection scenarios, case numbers
        // are the options chosen.

        // For multiple selection scenarios, case numbers
        // are defined in the generateCases() function
        // to parse user input

        // Do NOT calculate score here, score will be
        // updated before submission automatically

        this.character.happiness -= 0.05;

        switch (this.generateCase()) {
            case 1:
                this.character.statusScore += 1;
                this.character.networth -= 105000;
                this.character.happiness -= 0.02;
                this.character.stress += 0.06;
                this.character.health += 0;
                this.character.security += 0;
                break;
            case 2:
                this.character.statusScore += 1;
                this.character.networth -= 110000;
                this.character.happiness -= 0.02;
                this.character.stress += 0.06;
                this.character.health += 0;
                this.character.security += 0;
                break;
            case 3:
                this.character.statusScore += 1;
                this.character.networth -= 80000;
                this.character.happiness -= 0.02;
                this.character.stress += 0.03;
                this.character.health += 0;
                this.character.security += 0;
                break;

            default:
                console.log("No valid option chosen.");
                break;
        }
    }

    // Private, to be overridden by subclasses
    generateCase(): number {
        // Logic for parsing user input and generating
        // a case depending on combination of selections.

        // Used in processAnswer to determine what calculation
        // to perform

        // e.g. if options 2 and 3 are selected, generate case 5

        return this.selections[0];
    }
}

export { ScenarioOneA }