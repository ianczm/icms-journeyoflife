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
import { ScenarioThreeDCurveball } from "./ScenarioThreeDCurveball";
import { ScenarioFourA } from "./ScenarioFourA";
import { ScenarioFourACurveball } from "./ScenarioFourACurveball";
import { ScenarioFourB } from "./ScenarioFourB";
import { ScenarioFourC } from "./ScenarioFourC";
import { ScenarioFourDCurveball } from "./ScenarioFourDCurveball";
import { ScenarioFourE } from "./ScenarioFourE";
import { ScenarioFiveA } from "./ScenarioFiveA";
import { ScenarioFiveACurveball } from "./ScenarioFiveACurveball";
import { ScenarioFiveB } from "./ScenarioFiveB";
import { ScenarioFiveBCurveball } from "./ScenarioFiveBCurveball";
import { ScenarioFiveC } from "./ScenarioFiveC";
import { ScenarioThreeE } from "./ScenarioThreeE";
import { ScenarioThreeF } from "./ScenarioThreeF";
import { ScenarioThreeFCurveball } from "./ScenarioThreeFCurveball";
import { ScenarioFourECurveball } from "./ScenarioFourECurveball";
import { ScenarioFourD } from "./ScenarioFourD";

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
            case 16:
                return new ScenarioThreeDCurveball(character, pageid);
            case 17:
                return new ScenarioThreeE(character, pageid);
            case 18:
                return new ScenarioThreeF(character, pageid);
            case 19:
                return new ScenarioThreeFCurveball(character, pageid);
            case 20:
                return new ScenarioFourA(character, pageid);
            case 21:
                return new ScenarioFourACurveball(character, pageid);
            case 22:
                return new ScenarioFourB(character, pageid);
            case 23:
                return new ScenarioFourC(character, pageid);
            case 24:
                return new ScenarioFourD(character, pageid);
            case 25:
                return new ScenarioFourDCurveball(character, pageid);
            case 26:
                return new ScenarioFourE(character, pageid);
            case 27:
                return new ScenarioFourECurveball(character, pageid);
            case 28:
                return new ScenarioFiveA(character, pageid);
            case 29:
                return new ScenarioFiveACurveball(character, pageid);
            case 30:
                return new ScenarioFiveB(character, pageid);
            case 31:
                return new ScenarioFiveBCurveball(character, pageid);
            case 32:
                return new ScenarioFiveC(character, pageid);
            default:
                return new Scenario(character, pageid, false);
                break;
        }
    }
}

export { ScenarioSelector }