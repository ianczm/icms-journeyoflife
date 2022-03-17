import { Character } from "../character/Character";
import { Scenario } from "./Scenario"


// Page settings here
// Allow multiple selection?
const allowMultipleSelection: boolean = false;


class ScenarioThreeBCurveball extends Scenario {
    constructor(character: Character, currentPage: number) {
        // Build scenario
        // [!] page is still hardcoded
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

        switch (this.generateCase()) {
            case 1:
                this.character.networth += 0;
                this.character.statusScore += 0;
                this.character.happiness -= 0.06;
                this.character.stress += 0.02;
                this.character.health += -0.02;
                this.character.security += -0.02;
                break;
            case 2:
                this.character.networth += 200000;
                this.character.statusScore += 3;
                this.character.happiness += 0.03;
                this.character.stress += 0.06;
                this.character.health += -0.02;
                this.character.security += 0.02;
                break;
            case 3:
                this.character.networth += -700000;
                this.character.statusScore += 1;
                this.character.happiness += -0.04;
                this.character.stress += 0.06;
                this.character.health += -0.04;
                this.character.security += 0.03;
                break;
            case 4:
                this.character.networth += -700000;
                this.character.statusScore += 1;
                this.character.happiness -= 0.04;
                this.character.stress += 0.06;
                this.character.health += -0.04;
                this.character.security += 0.04;
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

export { ScenarioThreeBCurveball }