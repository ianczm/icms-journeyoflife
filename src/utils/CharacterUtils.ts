import { Character, CharacterInitial } from "../types/Character";
import { Asset, Liability, BalanceSheet } from "../types/BalanceSheet";
import { constructBalanceSheet, remainingAssets, remainingLiabilities } from "./BalanceSheetUtils";
import { Scenario } from "../classes/scenarios/Scenario";

export const constructCharacter = (
  userId: string,
  characterId: number
): Character => {
  let temp: Character = {
    age: 15,
    happiness: 0.5,
    score: 0,
    health: 0.5,
    security: 0.5,
    stress: 0.5,
    currentpage: 1,
    scenarioHistory: [],
    userid: userId,
    id: characterId,
    networth: CharacterInitial.CASH,
    statusScore: CharacterInitial.STATUS_SCORE,
    balanceSheet: constructBalanceSheet(CharacterInitial.CASH),
    previousOption: -1,
  };

  calculateScore(temp);

  return temp;
};

export const setPage = (character: Character, page: number): void => {
  character.currentpage = page;
};

export const rememberOption = (character: Character, option: number): void => {
  character.previousOption = option;
};

export const pushScenarioHistory = (
  character: Character,
  scenario: Scenario
): void => {
  character.scenarioHistory.push(scenario);
};

export const updateCharacterState = (
  character: Character,
  newCharacter: Character
): void => {
  // Page does not have to be updated as scenario
  // updates it on initialisation
  character.age = newCharacter.age;
  character.happiness = newCharacter.happiness;
  character.health = newCharacter.health;
  character.networth = newCharacter.networth;
  character.score = newCharacter.score;
  character.security = newCharacter.security;
  character.stress = newCharacter.stress;

  // Update database with character
  // ..
};

export const calculateScore = (character: Character): void => {
  // Implement some default behaviour

  // cap quality of life at 2
  var qualityOfLife = character.happiness + 1 - character.stress;

  // Perform score base calculation
  var score =
    character.networth * qualityOfLife * character.health * character.security;

  var bonus = handleScoreOverflow(character);

  if (character.networth <= 0) {
    character.score = CharacterInitial.SCORE * bonus;
  } else {
    character.score = bonus * score;
  }
};

export const handleScoreOverflow = (character: Character): number => {
  // in case there is overflow, these 4 metrics will add a bonus
  // to final score (which can be negative if the overflow left-sided)
  // positive overflow > 0
  // negative overflow < -1
  var healthOverflow = character.health - 1;
  var securityOverflow = character.security - 1;
  var happinessOverflow = character.happiness - 1;
  var stressOverflow = character.stress - 1;

  // if positive overflow, set to 1, else if negative overflow, set to 0, else no change
  if (healthOverflow > 0) {
    character.health = 1;
  } else if (healthOverflow < -1) {
    character.health = 0;
  } else {
    healthOverflow = 0;
  }
  if (securityOverflow > 0) {
    character.security = 1;
  } else if (securityOverflow < -1) {
    character.security = 0;
  } else {
    securityOverflow = 0;
  }
  if (happinessOverflow > 0) {
    character.happiness = 1;
  } else if (happinessOverflow < -1) {
    character.happiness = 0;
  } else {
    happinessOverflow = 0;
  }
  if (stressOverflow > 0) {
    character.stress = 1;
  } else if (stressOverflow < -1) {
    character.stress = 0;
  } else {
    stressOverflow = 0;
  }

  // average
  var bonus =
    0.25 *
      (healthOverflow + securityOverflow + happinessOverflow + stressOverflow) +
    1;
  return bonus;
};

export const pushAsset = (character: Character, asset: Asset) => {
  // { amount, interest, startAge, durationYears }
  character.balanceSheet.assets.push(asset);
};

export const pushLiability = (character: Character, liability: Liability) => {
  // { amount, interest, startAge, durationYears }
  character.balanceSheet.liabilities.push(liability);
};

export const getAssetAmount = (character: Character): number => {
  console.log("Assets: " + remainingAssets(character.balanceSheet, character.age));
  return remainingAssets(character.balanceSheet, character.age);
}

export const getLiabilitiesAmount = (character: Character): number => {
  return remainingLiabilities(character.balanceSheet, character.age);
}

export const useridList = [
  "gSQqXTieERWbf400vpzx3VXRQhx2",
  "XLU207IJfnO01KjadH7EY5azEa23",
  "p5GSOqezt0XbJy3848wsMcF9VTZ2",
  "zkROJelew7eUh5Ol1ISJkMmvFul2",
  "go9MkUdmxjW8u3VDOIWa2efOHVC2",
  "8zPeJcBEMWZTMbFLtTrcWx5Yl0H2",
  "bJKRRwcVguMiTOLwTBMNqlhZN8j2",
  "hfhBttvZsMMsSMzH3N3QAYKrGsB2",
  "q5hBpuHRUEdFjwmK7HvF9fAFu7Y2",
  "cbJS50Km5LPPQE07alfg7TscZh43",
  "yMFCwCLyCwaKixb3ynZpMrSUrwk2",
  "nQBdjH6z1pVihlssHGrjnnkZ3NE2",
  "YUwkSUkYQSbbhRaEwCB7zmsHtb62",
  "AYa14VVwduQ5o2ZJzNQdj7rwhGf1",
  "XalJt4YDHQNqq6YGqPedV1rWKik1",
  "hQ7MPWzXxNa4nG8ascLuUNdMK8f2",
  "kNgAGZX4awggfLx2zueWdlAdRpO2",
  "K5HConYpjzTHQjfR9Z4z07E2l7f2",
  "ujewmjucPtgl9KcSnR6efxybPfP2",
  "paHjQZvVkoaMdThQbz73HAZOCtF2",
];
