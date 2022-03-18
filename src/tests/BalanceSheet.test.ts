import { test, expect, describe } from "vitest";
import { CharacterInitial } from "../classes/character/Character";
import {
  InterestType,
  Asset,
  Assets,
  BalanceSheet,
  Liabilities,
  Liability,
} from "../types/BalanceSheet";
import { autopay, constructBalanceSheet, pushAsset, pushLiability, remainingAssets, remainingLiabilities } from "../utils/BalanceSheetUtils";

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
    const balanceSheet = constructBalanceSheet(CharacterInitial.CASH);

    pushAsset(balanceSheet, assetOne);

    expect(balanceSheet.assets[0]).toBe(assetOne);
    expect(balanceSheet.assets[0].name).toBe("InvestmentOne");
  });

  // pushLiability
  test("shouldPushLiability", () => {
    const balanceSheet = constructBalanceSheet(CharacterInitial.CASH);

    pushLiability(balanceSheet, liabilityOne);

    expect(balanceSheet.liabilities[0]).toBe(liabilityOne);
    expect(balanceSheet.liabilities[0].name).toBe("LoanOne");
  });

  // remainingAssets
  test("shouldTotalAssetsWithoutAge", () => {
    const balanceSheet = constructBalanceSheet(CharacterInitial.CASH);

    pushAsset(balanceSheet, assetOne);
    pushAsset(balanceSheet, assetTwo);

    // without taking age into account
    expect(remainingAssets(balanceSheet, assetOne.startAge)).toBe(
      assetOne.amount + assetTwo.amount
    );
  });

  // remainingAssets
  test("shouldTotalAssetsWithAge", () => {
    const addedAge = 4;
    const balanceSheet = constructBalanceSheet(CharacterInitial.CASH);

    pushAsset(balanceSheet, assetOne);
    pushAsset(balanceSheet, assetTwo);

    // while taking age into account, after 4 years
    // simple interest
    const assetOneValue = assetOne.amount * (1 + assetOne.interest * addedAge);

    // while taking age into account, after 4 years
    // compound interest
    const assetTwoValue = assetTwo.amount * (1 + assetTwo.interest) ** addedAge;

    expect(remainingAssets(balanceSheet, assetOne.startAge + addedAge)).toBe(
      assetOneValue + assetTwoValue
    );
  });

  // remainingLiabilities
  test("shouldTotalLiabilitiesWithoutAge", () => {
    const balanceSheet = constructBalanceSheet(CharacterInitial.CASH);

    pushLiability(balanceSheet, liabilityOne);
    pushLiability(balanceSheet, liabilityTwo);

    // apply payable interest on liability
    const liabilityOneAfterInterest =
      liabilityOne.amount *
      (1 + liabilityOne.interest * liabilityOne.durationYears);

    // apply payable interest on liability
    const liabilityTwoAfterInterest =
      liabilityTwo.amount *
      (1 + liabilityTwo.interest * liabilityOne.durationYears);

    // without taking age into account
    expect(remainingLiabilities(balanceSheet, liabilityOne.startAge)).toBe(
      liabilityOneAfterInterest + liabilityTwoAfterInterest
    );
  });

  // remainingLiabilities
  test("shouldTotalLiabilitiesWithoutPaymentWithAge", () => {
    const addedAge = 4;
    const balanceSheet = constructBalanceSheet(CharacterInitial.CASH);

    pushLiability(balanceSheet, liabilityOne);
    pushLiability(balanceSheet, liabilityTwo);

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
      remainingLiabilities(balanceSheet, liabilityOne.startAge + addedAge)
    ).toBe(liabilityOne.durationYears * (yearlyPayableOne + yearlyPayableTwo));
  });

  // autopay
  test("shouldAutoPayLiabilities", () => {
    const addedAge = 4; // should return 7200
    const balanceSheet = constructBalanceSheet(CharacterInitial.CASH);

    pushLiability(balanceSheet, liabilityOne);
    pushLiability(balanceSheet, liabilityTwo);

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
    autopay(balanceSheet, liabilityOne.durationYears + addedAge);

    // while taking age into account, after 4 years with timely payment
    // simple interest
    expect(
      remainingLiabilities(balanceSheet, liabilityOne.startAge + addedAge)
    ).toBe(
      (liabilityOne.durationYears - addedAge) *
        (yearlyPayableOne + yearlyPayableTwo)
    );
  });
});
