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

export interface BalanceSheet {
  assets: Assets;
  liabilities: Liabilities;
  cash: number;
  amountPaid: number;
  cash: number;
}
