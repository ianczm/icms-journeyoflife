interface BalanceSheet {

    // who it belongs to
    characterid: number;

    // assets should be instantiated with cash as the initial account
    // so far thie list is like this
    //  - cash
    //  - insurance
    //  - emergency fund
    //  - savings
    //  - non-current assets
    assets: Array<Account>;

    // liabilities doesnt have to be instantiated yet ba
    //  - loans
    liabilities: Array<Account>;



    // assets - liabilities
    getNetWorth(): number;
}