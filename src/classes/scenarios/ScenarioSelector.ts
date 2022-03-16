import { Scenario } from "./Scenario"
import { ScenarioOneA } from "./ScenarioOneA"
import { ScenarioOneB } from "./ScenarioOneB"
import { Character } from "../character/Character"

class ScenarioSelector {

    constructor() {}

    static getScenario(character: Character, pageid: number) : Scenario {
        switch (pageid) {
            case 1:
                return new ScenarioOneA(character, pageid);
            case 2:
                return new ScenarioOneB(character, pageid);
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