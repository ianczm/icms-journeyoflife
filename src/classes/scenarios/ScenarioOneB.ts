import { Character } from "../character/Character";
import { Scenario } from "./Scenario"


// Page settings here
// Allow multiple selection?
const allowMultipleSelection: boolean = false;


class ScenarioOneB extends Scenario {
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
                this.character.networth += 800;
                this.character.happiness -= 0.015;
                this.character.stress += 0.03;
                this.character.health -= 0.01;
                break;
            case 2:
                this.character.networth += 1000;
                this.character.happiness += 0.01;
                this.character.stress -= 0.005;
                break;
            case 3:
                this.character.networth += 700;
                this.character.happiness += 0.01;
                this.character.stress += 0.035;
                this.character.health -= 0.01;
                break;
            case 4:
                this.character.networth -= 6500;
            default:
                throw {
                    name: "UnmatchedOptionError",
                    message: "Selected choices are not valid."
                };
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

export { ScenarioOneB }