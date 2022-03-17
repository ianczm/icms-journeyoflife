import { Scenario } from "./Scenario";
import { BalanceSheet } from "./BalanceSheet";

export enum CharacterInitial {
  CASH = 5000,
  SCORE = 1250,
  STATUS_SCORE = 10,
}

export interface Character {
  age: number;

  // Main Metrics
  score: number;
  networth: number;
  statusScore: number;

  // Statistics
  happiness: number;
  health: number;
  security: number;
  stress: number;

  // feature/assetliability
  // assets: Array<Asset>;
  // liabilities: Array<Liability>;
  balanceSheet: BalanceSheet;

  // Navigation
  currentpage: number;
  previousOption: number;
  scenarioHistory: Array<Scenario>;

  // Registration
  userid: number;
  id: number; // for Character
}
