import { Scenario } from "../scenarios/Scenario";
import { BalanceSheet } from "./BalanceSheet";

class Character {

    age: number;

    // Main Metrics
    score: number;
    networth: number;

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
    scenarioHistory: Array<Scenario>;

    // Registration
    userid: number;
    id: number; // for Character

    constructor(userid, characterid) {
        // These fields should not be changed directly
        // should only be through update character
        this.age = 15;
        this.happiness = 0.5;
        this.health = 0.5;
        this.networth = 5000;
        this.score = 1250;
        this.security = 0.5;
        this.stress = 0.5;

        // Updated by scenario
        this.currentpage = 1;
        
        // Scenario instances will be here
        this.scenarioHistory = [];

        // Register user and database characterid
        this.userid = userid;
        this.id = characterid;

        this.balanceSheet = new BalanceSheet();
    }

    setPage(page) {
        this.currentpage = page;
    }

    pushScenarioHistory(scenario) {
        this.scenarioHistory.push(scenario);
    }

    updateCharacterState(character) {
        // Page does not have to be updated as scenario
        // updates it on initialisation
        this.age = character.age;
        this.happiness = character.happiness;
        this.health = character.health;
        this.networth = character.networth;
        this.score = character.score;
        this.security = character.security;
        this.stress = character.stress;

        // Update database with character
        // ..
    }

    pushAsset(asset) { // { amount, interest, startAge, durationYears }
      this.balanceSheet.assets.push(asset);
    }

    pushLiability(liability) { // { amount, interest, startAge, durationYears }
      this.balanceSheet.liabilities.push(liability);
    }
}

const useridList = [
    'gSQqXTieERWbf400vpzx3VXRQhx2',
    'XLU207IJfnO01KjadH7EY5azEa23',
    'p5GSOqezt0XbJy3848wsMcF9VTZ2',
    'zkROJelew7eUh5Ol1ISJkMmvFul2',
    'go9MkUdmxjW8u3VDOIWa2efOHVC2',
    '8zPeJcBEMWZTMbFLtTrcWx5Yl0H2',
    'bJKRRwcVguMiTOLwTBMNqlhZN8j2',
    'hfhBttvZsMMsSMzH3N3QAYKrGsB2',
    'q5hBpuHRUEdFjwmK7HvF9fAFu7Y2',
    'cbJS50Km5LPPQE07alfg7TscZh43',
    'yMFCwCLyCwaKixb3ynZpMrSUrwk2',
    'nQBdjH6z1pVihlssHGrjnnkZ3NE2',
    'YUwkSUkYQSbbhRaEwCB7zmsHtb62',
    'AYa14VVwduQ5o2ZJzNQdj7rwhGf1',
    'XalJt4YDHQNqq6YGqPedV1rWKik1',
    'hQ7MPWzXxNa4nG8ascLuUNdMK8f2',
    'kNgAGZX4awggfLx2zueWdlAdRpO2',
    'K5HConYpjzTHQjfR9Z4z07E2l7f2',
    'ujewmjucPtgl9KcSnR6efxybPfP2',
    'paHjQZvVkoaMdThQbz73HAZOCtF2'
];

export { Character, useridList };