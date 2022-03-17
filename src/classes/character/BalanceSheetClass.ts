import {
  InterestType,
  Asset,
  Assets,
  BalanceSheet,
  Liabilities,
  Liability,
} from "../../types/BalanceSheet";

class BalanceSheetClass implements BalanceSheet {
  assets: Assets;
  liabilities: Liabilities;
  amountPaid: number;
  cash: number;

  constructor(cash) {
    this.assets = [];
    this.liabilities = [];
    this.amountPaid = 0;
    this.cash = cash;
  }

  // Add new amount
  pushAsset(asset: Asset): void {
    this.assets.push(asset);
  }

  pushLiability(liability: Liability): void {
    this.liabilities.push(liability);
  }

  // Assets methods
  remainingAssets(age: number): number {
    const calculateYield = (currSum: number, asset: Asset) => {
      const diff = age - asset.startAge;
      if (diff >= asset.durationYears) {
        if (asset.interestType == InterestType.COMPOUND) {
          return (
            currSum +
            asset.amount * Math.pow(1 + asset.interest, asset.durationYears)
          );
        } else {
          return (
            currSum + asset.amount * (1 + asset.interest * asset.durationYears)
          );
        }
      } else {
        if (asset.interestType == InterestType.COMPOUND) {
          return currSum + asset.amount * Math.pow(1 + asset.interest, diff);
        } else {
          return currSum + asset.amount * (1 + asset.interest * diff);
        }
      }
    };

    return this.assets.reduce(calculateYield, 0);
  }

  liquidate(name: string, age: number): number {
    let found = false;

    const calculateYield = (asset: Asset) => {
      const diff = age - asset.startAge;
      if (diff >= asset.durationYears) {
        if (asset.interestType == InterestType.COMPOUND) {
          return (
            asset.amount * Math.pow(1 + asset.interest, asset.durationYears)
          );
        } else {
          return asset.amount * (1 + asset.interest * asset.durationYears);
        }
      } else {
        if (asset.interestType == InterestType.COMPOUND) {
          return asset.amount * Math.pow(1 + asset.interest, diff);
        } else {
          return asset.amount * (1 + asset.interest * diff);
        }
      }
    };

    for (let i = 0; i < this.assets.length; i++) {
      if ((this.assets[i].name = name)) {
        found = true;
        const res = calculateYield(this.assets[i]);
        this.assets.splice(i, 1);
        return res;
      }
    }

    return 0;
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

  autopay(age: number): void {
    const calculatePayable = (currSum: number, liability: Liability) => {
      const diff = age - liability.startAge;
      if (diff >= liability.durationYears) {
        return currSum;
      } else {
        const total =
          liability.amount * (1 + liability.interest * liability.durationYears);
        const payable = total / liability.durationYears;
        return currSum + payable;
      }
    };

    this.amountPaid += this.liabilities.reduce(calculatePayable, 0);
  }
}

export { BalanceSheetClass };
