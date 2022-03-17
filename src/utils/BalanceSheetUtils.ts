import { InterestType, Asset, BS, Liability } from "../types/BS";

// Create a balance sheet object
export const createBalanceSheet = (initialCash: number): BS => {
  let temp: BS = {
    amountPaid: 0,
    assets: [],
    liabilities: [],
    cash: initialCash,
  };
  return temp;
};

// Add asset to a balance sheet
export const pushAsset = (balanceSheet: BS, asset: Asset): void => {
  balanceSheet.assets.push(asset);
};

// Add liability to a balance sheet
export const pushLiability = (balanceSheet: BS, liability: Liability): void => {
  balanceSheet.liabilities.push(liability);
};

// Obtain the total assets in a balance sheet
export const remainingAssets = (balanceSheet: BS, age: number): number => {
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

  return balanceSheet.assets.reduce(calculateYield, 0);
};

// Converting an asset into cash
export const liquidate = (
  balanceSheet: BS,
  name: string,
  age: number
): number => {
  let found = false;

  const calculateYield = (asset: Asset) => {
    const diff = age - asset.startAge;
    if (diff >= asset.durationYears) {
      if (asset.interestType == InterestType.COMPOUND) {
        return asset.amount * Math.pow(1 + asset.interest, asset.durationYears);
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

  for (let i = 0; i < balanceSheet.assets.length; i++) {
    if ((balanceSheet.assets[i].name = name)) {
      found = true;
      const res = calculateYield(balanceSheet.assets[i]);
      balanceSheet.assets.splice(i, 1);
      return res;
    }
  }

  return 0;
};

// Obtain the total liabilities in a balance sheet
export const remainingLiabilities = (balanceSheet: BS, age: number): number => {
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

  return (
    balanceSheet.liabilities.reduce(calculateDebt, 0) - balanceSheet.amountPaid
  );
};

// Pay the liability in cash
export const payLiability = (balanceSheet: BS, amount: number): void => {
  balanceSheet.amountPaid += amount;
};

// Paying the payable liability up to the age
export const autopay = (balanceSheet: BS, age: number): void => {
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

  balanceSheet.amountPaid += balanceSheet.liabilities.reduce(
    calculatePayable,
    0
  );
};
