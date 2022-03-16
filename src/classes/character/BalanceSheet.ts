import { Asset, Assets, BS, Liabilities, Liability } from "../../types/BS";

class BalanceSheet implements BS {
  assets: Assets;
  liabilities: Liabilities;
  amountPaid: number;

  constructor() {
    this.assets = [];
    this.liabilities = [];
    this.amountPaid = 0;
  }

  // Add new amount
  pushAsset(asset: Asset): void {
    this.assets.push(asset);
  }

  pushLiability(liability: Liability): void {
    this.liabilities.push(liability);
  }

  // Return remaining amount
  remainingAssets(age: number): number {
    const calculateYield = (currSum: number, asset: Asset) => {
      const diff = age - asset.startAge;
      if (diff >= asset.durationYears) {
        return (
          currSum +
          asset.amount * Math.pow(1 + asset.interest, asset.durationYears)
        );
      } else {
        return currSum + asset.amount * Math.pow(1 + asset.interest, diff);
      }
    };

    return this.assets.reduce(calculateYield, 0);
  }

  remainingLiabilities(age: number): number {
    const calculateDebt = (currSum: number, liability: Liability) => {
      const diff = age - liability.startAge;
      if (diff >= liability.durationYears) {
        return currSum;
      } else {
        const total =
          liability.amount * (1 + liability.interest * liability.durationYears);
        return currSum + total;
      }
    };

    return this.liabilities.reduce(calculateDebt, 0) - this.amountPaid;
  }

  payLiability(amount: number): void {
    this.amountPaid += amount;
  }
}

export { BalanceSheet };
