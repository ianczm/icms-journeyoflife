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

export interface BS {
  assets: Assets;
  liabilities: Liabilities;
  cash: number;
  amountPaid: number;

  increaseCash: (amount: number) => number;

  decreaseCash: (amount: number) => number;
  // Add new amount
  pushAsset: (asset: Asset) => void;

  pushLiability: (liability: Liability) => void;

  // Return remaining amount
  remainingAssets: (age: number) => number;

  liquidate: (name: string, age: number) => number;

  remainingLiabilities: (age: number) => number;

  payLiability: (amount: number) => void;

  autopay: (age: number) => void;
}
