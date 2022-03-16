interface AccountItem {

    // not sure if we really need to create subclasses, i'll leave that up to you
    // potential subclasses are Asset and Liability, if you find extra features for them
    amount: number;

    // instead of subclasses we can just name it "House" or "Car" or "Cash" or "Investment"
    // should be easy to filter
    name: string;

    // > 1 for appreciating assets e.g. house
    // 0 < x < 1 for depreciating assets e.g. car
    interest: number;

    // if interest is not used, we might still have to find
    // a way to calculate increment/decrement e.g. in salary which is not % based
    // how can we choose between interest or instalment?
    instalment: number;

    // in years. if 0, treat as infinite
    duration: number;      

    // 1.   returns difference in value after simulation, the idea is we can loop over
    //      a list of assets to get how much they have increased in value
    // 2.   also mutates this.amount to whatever the intended is amount after simulation
    simulateYears(years: number): number;
}