class Character {
    constructor() {
        // These fields should not be changed directly
        // should only be through update character
        this.age = 15;
        this.happiness = 0.5;
        this.health = 0.5;
        this.networth = 5000;
        this.score = 0;
        this.security = 0.5;
        this.stress = 0.5;

        // Updated by scenario
        this.currentpage = 1;
        
        // Scenario instances will be here
        this.scenarioHistory = [];
    }
    setPage(page) {
        this.currentpage = page;
    }
    pushScenarioHistory(scenario) {
        this.options.push(scenario);
    }
    updateCharacterState(scenario) {
        // Page does not have to be updated as scenario
        // updates it on initialisation
        this.age = scenario.characterScenario.age;
        this.happiness = scenario.characterScenario.happiness;
        this.health = scenario.characterScenario.health;
        this.networth = scenario.characterScenario.networth;
        this.score = scenario.characterScenario.score;
        this.security = scenario.characterScenario.security;
        this.stress = scenario.characterScenario.stress;

        // Add scenario into history
        this.pushScenarioHistory(scenario);
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
];

export { Character, useridList };