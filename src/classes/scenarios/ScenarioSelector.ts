import { Scenario } from "./Scenario"
import { ScenarioOneA } from "./ScenarioOneA"
import { ScenarioOneB } from "./ScenarioOneB"
import { Character } from "../character/Character"
import { ScenarioTwoA } from "./ScenarioTwoA";
import { ScenarioTwoB } from "./ScenarioTwoB";
import { ScenarioTwoBCurveball } from "./ScenarioTwoBCurveball";
import { ScenarioTwoC } from "./ScenarioTwoC";
import { ScenarioTwoCCurveball } from "./ScenarioTwoCCurveball";
import { ScenarioTwoD } from "./ScenarioTwoD";
import { ScenarioThreeA } from "./ScenarioThreeA";
import { ScenarioThreeB } from "./ScenarioThreeB";
import { ScenarioThreeACurveball } from "./ScenarioThreeACurveball";
import { ScenarioThreeBCurveball } from "./ScenarioThreeBCurveball";
import { ScenarioThreeC } from "./ScenarioThreeC";
import { ScenarioThreeCCurveball } from "./ScenarioThreeCCurveball";
import { ScenarioThreeD } from "./ScenarioThreeD";

class ScenarioSelector {

    constructor() {}

    static getScenario(character: Character, pageid: number) : Scenario {
        switch (pageid) {
            case 1:
                return new ScenarioOneA(character, pageid);
            case 2:
                return new ScenarioOneB(character, pageid);
            case 3:
                return new ScenarioTwoA(character, pageid);
            case 4:
                return new ScenarioTwoB(character, pageid);
            case 5:
                return new ScenarioTwoBCurveball(character, pageid);
            case 6:
                return new ScenarioTwoC(character, pageid);
            case 7:
                return new ScenarioTwoCCurveball(character, pageid);
            case 8:
                return new ScenarioTwoD(character, pageid);
            case 9:
                return new ScenarioThreeA(character, pageid);
            case 10:
                return new ScenarioThreeACurveball(character, pageid);
            case 11:
                return new ScenarioThreeB(character, pageid);
            case 12:
                return new ScenarioThreeBCurveball(character, pageid);
            case 13:
                return new ScenarioThreeC(character, pageid);
            case 14:
                return new ScenarioThreeCCurveball(character, pageid);
            case 15:
                return new ScenarioThreeD(character, pageid);
            default:
                return new Scenario(character, pageid, false);
                break;
        }
    }
}

export { ScenarioSelector }