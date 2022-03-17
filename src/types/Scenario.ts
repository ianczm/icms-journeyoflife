import { Firestore } from "firebase/firestore";
import { Character } from "./Character";

export interface Scenario {
  db: Firestore;
  character: Character;
  currentPage: number;
  selectionsReady: boolean;
  selections: Array<number>;
  allowMultipleSelection: boolean;
  hasCompleted: boolean;
}

export interface Options {
  optionid: number;
  desc: string;
  outcome: string;
}

export interface ScenarioContent {
  pageid: number;

  heading: string; // Phase 1
  phase: string; // Phase 1A
  title: string; // Managing Your Home

  body: string;
  options: Array<Options>;
}
