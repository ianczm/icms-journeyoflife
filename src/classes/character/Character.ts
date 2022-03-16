import { Scenario } from "../scenarios/Scenario";
import { BalanceSheet } from "./BalanceSheet";

enum CharacterInitial {
    CASH = 7500,
    SCORE = 3125
}

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
        // this.score = CharacterInitial.SCORE;
        this.security = 0.5;
        this.stress = 0.5;

        // Updated by scenario
        this.currentpage = 1;

        // Scenario instances will be here
        this.scenarioHistory = [];

        // Register user and database characterid
        this.userid = userid;
        this.id = characterid;

        // to be replaced with balanceSheet.cash
        this.networth = CharacterInitial.CASH;

        this.calculateScore();

        this.balanceSheet = new BalanceSheet(CharacterInitial.CASH);
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

    calculateScore(): void {

        // Implement some default behaviour

        // cap quality of life at 2
        var qualityOfLife = (this.happiness + 1 - this.stress);

        // Perform score base calculation
        var score = this.networth * qualityOfLife * this.health * this.security;

        var bonus = this.handleScoreOverflow();

        if (this.networth <= 0) {
            this.score = CharacterInitial.SCORE * bonus;
        } else {
            this.score = bonus * score;
        }
    }

    handleScoreOverflow(): number {
        // in case there is overflow, these 4 metrics will add a bonus
        // to final score (which can be negative if the overflow left-sided)
        // positive overflow > 0
        // negative overflow < -1
        var healthOverflow = this.health - 1;
        var securityOverflow = this.security - 1;
        var happinessOverflow = this.happiness - 1;
        var stressOverflow = this.stress - 1;

        // if positive overflow, set to 1, else if negative overflow, set to 0, else no change
        if (healthOverflow > 0) {
            this.health = 1;
        } else if (healthOverflow < -1) {
            this.health = 0;
        } else {
            healthOverflow = 0;
        }
        if (securityOverflow > 0) {
            this.security = 1;
        } else if (securityOverflow < -1) {
            this.security = 0;
        } else {
            securityOverflow = 0;
        }
        if (happinessOverflow > 0) {
            this.happiness = 1;
        } else if (happinessOverflow < -1) {
            this.happiness = 0;
        } else {
            happinessOverflow = 0;
        }
        if (stressOverflow > 0) {
            this.stress = 1;
        } else if (stressOverflow < -1) {
            this.stress = 0;
        } else {
            stressOverflow = 0;
        }

        // average
        var bonus = (0.25 * (healthOverflow + securityOverflow + happinessOverflow + stressOverflow)) + 1;
        return bonus;
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

export { Character, useridList, CharacterInitial };