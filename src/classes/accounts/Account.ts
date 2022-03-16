interface Account {

    // Currently we should have only Assets and Liabilities
    // but we can implement Equity as well

    // current valuation of all items
    balance: number;

    // all items are stored here
    items: Array<AccountItem>;

    // simulate all items, returns the total difference
    // also mutates this.balance to reflect new valuation
    simulateYearsAll(): number;
}