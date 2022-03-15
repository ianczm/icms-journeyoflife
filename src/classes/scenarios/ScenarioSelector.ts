import { AbstractCharacterScenario } from "./AbstractCharacterScenario"
import { ScenarioOne } from "./ScenarioOne"
import { Character } from "../Character"

class ScenarioSelector {

    constructor() {}

    getScenario(character: Character, pageid: number) : AbstractCharacterScenario {
        switch (pageid) {
            case 1:
                return new ScenarioOne(character, pageid);
            // case 2:
            //     return new ScenarioTwo(character, pageid);
            // case 3:
            //     return new ScenarioThree(character, pageid);
            // case 4:
            //     return new ScenarioFour(character, pageid);
            // case 5:
            //     return new ScenarioFive(character, pageid);
            default:
                break;
        }
    }
}

export { ScenarioSelector }