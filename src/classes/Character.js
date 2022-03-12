class Character {
    constructor() {
        this.age = 15,
            this.currentpage = 1,
            this.happiness = 0.5,
            this.health = 0.5,
            this.networth = 5000,
            this.score = 0,
            this.security = 0.5,
            this.stress = 0.5
    }
    addHappiness(x) {
        this.happiness += x;
        return this.happiness;
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