import { test, expect, describe } from "vitest";
import { BalanceSheet } from "../classes/character/BalanceSheet";
import { CharacterInitial } from "../classes/character/Character";
import {
  InterestType,
  Asset,
  Assets,
  BS,
  Liabilities,
  Liability,
} from "../types/BS";

describe("BalanceSheet", () => {
  const assetOne = {
    name: "InvestmentOne",
    amount: 1000,
    interestType: InterestType.SIMPLE,
    interest: 0.04,
    startAge: 20,
    durationYears: 5,
  } as Asset;

  const assetTwo = {
    name: "InvestmentTwo",
    amount: 2000,
    interestType: InterestType.COMPOUND,
    interest: 0.04,
    startAge: 20,
    durationYears: 5,
  } as Asset;

  const liabilityOne = {
    name: "LoanOne",
    amount: 10000,
    interest: 0.04,
    startAge: 20,
    durationYears: 5,
  } as Liability;

  const liabilityTwo = {
    name: "LoanTwo",
    amount: 20000,
    interest: 0.04,
    startAge: 20,
    durationYears: 5,
  } as Liability;

  // pushAsset
  test("shouldPushAsset", () => {
    const balanceSheet = new BalanceSheet(CharacterInitial.CASH);

    balanceSheet.pushAsset(assetOne);

    expect(balanceSheet.assets[0]).toBe(assetOne);
    expect(balanceSheet.assets[0].name).toBe("InvestmentOne");
  });

  // pushLiability
  test("shouldPushLiability", () => {
    const balanceSheet = new BalanceSheet(CharacterInitial.CASH);

    balanceSheet.pushLiability(liabilityOne);

    expect(balanceSheet.liabilities[0]).toBe(liabilityOne);
    expect(balanceSheet.liabilities[0].name).toBe("LoanOne");
  });

  // remainingAssets
  test("shouldTotalAssetsWithoutAge", () => {
    const balanceSheet = new BalanceSheet(CharacterInitial.CASH);

    balanceSheet.pushAsset(assetOne);
    balanceSheet.pushAsset(assetTwo);

    // without taking age into account
    expect(balanceSheet.remainingAssets(assetOne.startAge)).toBe(
      assetOne.amount + assetTwo.amount
    );
  });

  // remainingAssets
  test("shouldTotalAssetsWithAge", () => {
    const addedAge = 4;
    const balanceSheet = new BalanceSheet(CharacterInitial.CASH);

    balanceSheet.pushAsset(assetOne);
    balanceSheet.pushAsset(assetTwo);

    // while taking age into account, after 4 years
    // simple interest
    const assetOneValue = assetOne.amount * (1 + assetOne.interest * addedAge);

    // while taking age into account, after 4 years
    // compound interest
    const assetTwoValue = assetTwo.amount * (1 + assetTwo.interest) ** addedAge;

    expect(balanceSheet.remainingAssets(assetOne.startAge + addedAge)).toBe(
      assetOneValue + assetTwoValue
    );
  });

  // remainingLiabilities
  test("shouldTotalLiabilitiesWithoutAge", () => {
    const balanceSheet = new BalanceSheet(CharacterInitial.CASH);

    balanceSheet.pushLiability(liabilityOne);
    balanceSheet.pushLiability(liabilityTwo);

    // apply payable interest on liability
    const liabilityOneAfterInterest =
      liabilityOne.amount *
      (1 + liabilityOne.interest * liabilityOne.durationYears);

    // apply payable interest on liability
    const liabilityTwoAfterInterest =
      liabilityTwo.amount *
      (1 + liabilityTwo.interest * liabilityOne.durationYears);

    // without taking age into account
    expect(balanceSheet.remainingLiabilities(liabilityOne.startAge)).toBe(
      liabilityOneAfterInterest + liabilityTwoAfterInterest
    );
  });

  // remainingLiabilities
  test("shouldTotalLiabilitiesWithoutPaymentWithAge", () => {
    const addedAge = 4;
    const balanceSheet = new BalanceSheet(CharacterInitial.CASH);

    balanceSheet.pushLiability(liabilityOne);
    balanceSheet.pushLiability(liabilityTwo);

    // apply payable interest on liability
    const liabilityOneAfterInterest =
      liabilityOne.amount *
      (1 + liabilityOne.interest * liabilityOne.durationYears);
    const yearlyPayableOne =
      liabilityOneAfterInterest / liabilityOne.durationYears;

    // apply payable interest on liability
    const liabilityTwoAfterInterest =
      liabilityTwo.amount *
      (1 + liabilityTwo.interest * liabilityOne.durationYears);
    const yearlyPayableTwo =
      liabilityTwoAfterInterest / liabilityTwo.durationYears;

    // while taking age into account, after 4 years without payment
    // simple interest
    expect(
      balanceSheet.remainingLiabilities(liabilityOne.startAge + addedAge)
    ).toBe(liabilityOne.durationYears * (yearlyPayableOne + yearlyPayableTwo));
  });

  // autopay
  test("shouldAutoPayLiabilities", () => {
    const addedAge = 4;
    const balanceSheet = new BalanceSheet(CharacterInitial.CASH);

    balanceSheet.pushLiability(liabilityOne);
    balanceSheet.pushLiability(liabilityTwo);

    // apply payable interest on liability
    const liabilityOneAfterInterest =
      liabilityOne.amount *
      (1 + liabilityOne.interest * liabilityOne.durationYears);
    const yearlyPayableOne =
      liabilityOneAfterInterest / liabilityOne.durationYears;

    // apply payable interest on liability
    const liabilityTwoAfterInterest =
      liabilityTwo.amount *
      (1 + liabilityTwo.interest * liabilityOne.durationYears);
    const yearlyPayableTwo =
      liabilityTwoAfterInterest / liabilityTwo.durationYears;

    // reduce liabilities by 4 years
    balanceSheet.autopay(liabilityOne.startAge + addedAge);
    /*
    for (let i = 0; i < addedAge; i++) {
      balanceSheet.autopay(liabilityOne.startAge + i);
    }
    */

    // while taking age into account, after 4 years with timely payment
    // simple interest
    expect(
      balanceSheet.remainingLiabilities(liabilityOne.startAge + addedAge)
    ).toBe(
      (liabilityOne.durationYears - addedAge) *
        (yearlyPayableOne + yearlyPayableTwo)
    );
  });
});
