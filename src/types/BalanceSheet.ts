export enum InterestType {
  SIMPLE,
  COMPOUND,
}

export interface Asset {
  name: string;
  amount: number;
  interestType: InterestType;
  interest: number;
  startAge: number;
  durationYears: number;
}

export type Assets = Asset[];

export interface Liability {
  name: string;
  amount: number;
  interest: number;
  startAge: number;
  durationYears: number;
}

export type Liabilities = Liability[];

// added for monthly income and expenses
export interface MonthlyAccount {
  name: string;
  amount: number;
}

export type MonthlyAccounts = MonthlyAccount[];

export interface BalanceSheet {
  assets: Assets;
  liabilities: Liabilities;
  cash: number;
  amountPaid: number;

  /**
   * monthly income and expenses
   * - monthlyIncome: MonthlyAccounts;
   * - monthlyExpenses: MonthlyAccounts;
   */
  

  /**
   * 
   * Monthly Accounts are needed for
   * - fixed income like salary, dividends
   * - fixed expenses like utility, employee costs
   * 
   * They do not age like assets/liabilities, and
   * will only change value when indicated explicitly by
   * the question.
   * - so I think we cannot use the aging technique like with
   * assets and liabilities, they can be taken out at any time
   * 
   * Use cases:
   * - person's utility bill increased, but we don't want
   * to change how much he's still paying for employee costs
   * 
   * Methods I can think of (don't mind the long names)
   * 
   * simulateMonthlyAccounts = (years): number
   * - should mutate object's cash value = all incomes - all expenses
   * - should also return amount changed, so that it can be displayed
   * on the outcome screen
   * - years should be computed by currentAge-previousAge (so I would
   * imagine this method will run every time character.age is updated)
   * 
   * updateAgeAndSimulateMonthlyAccounts(character, newAge): number
   * - outputs difference in years and then runs the above method
   * 
   * pushMonthlyAccount = (character, account): void
   * - simply adds a new account to be processed when the next
   * scenario is loaded
   * 
   * removeMonthlyAccount = (character, accountName: string): void
   * - removes monthly account by name
   * 
   * Let me know how possible this is sir, and thank you so much
   * for the help :'D
   * 
   */
}
