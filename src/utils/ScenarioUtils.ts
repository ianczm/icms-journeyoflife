import { doc, Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { Scenario } from "../types/Scenario";
import { Character } from "../types/Character";
import { rememberOption, calculateScore, autopayCharacter } from "./CharacterUtils";

export const constructScenario = (
  character: Character,
  currentPage: number,
  allowMultipleSelection: boolean
): Scenario => {
  let temp: Scenario = {
    db: getFirestore(),
    character: character,
    currentPage: currentPage,
    hasCompleted: false,
    selectionsReady: false,
    selections: [],
    allowMultipleSelection: allowMultipleSelection,
  };

  getDatabaseSelections(temp);

  return temp;
};

// Public, onClick event
export const updateSelectedOptions = (
  scenario: Scenario,
  optionNumber: number
): void => {
  // To update the database as participants select options
  // to be displayed to others in real time

  if (scenario.selections.includes(optionNumber)) {
    // toggle behavior: deactivate selection if already active
    scenario.selections = scenario.selections.filter((option) => {
      return option != optionNumber;
    });
  } else {
    // normal behavior, add option
    if (scenario.selections && scenario.allowMultipleSelection) {
      // if there is another selection already, check if ms is enabled
      scenario.selections.push(optionNumber);
    } else {
      // if not, set first element to optionNumber
      scenario.selections[0] = optionNumber;
    }
  }
  // Update database with options

  createOrUpdateDatabaseInstance(scenario);
};

// Public, onClick event
export const submitAnswer = (scenario: Scenario): void => {
  // Perform multiple selection validation
  try {
    if (!scenario.selections) {
      throw {
        name: "NoSelectionError",
        message: "Please choose at least one option.",
      };
    } else if (
      scenario.selections.length > 1 &&
      !scenario.allowMultipleSelection
    ) {
      throw {
        name: "MultipleSelectionError",
        message: "You may only choose one option.",
      };
    }

    // Proceed with answer processing
    rememberOption(scenario.character, scenario.selections[0]);

    processAnswer(scenario);

    // Update character upon submit after perfoming
    // logic and calculations
    calculateScore(scenario.character);

    // Find a way to update the database
    scenario.hasCompleted = true;

    createOrUpdateDatabaseInstance(scenario);
    updateCharacterDatabaseInstance(scenario);
  } catch (e) {
    // Somehow render scenario to HTML
    alert(e.name + " " + e.message);
  }
};

export const autopayScenario = (scenario: Scenario): number => {
  scenario.character.balanceSheet.amountPaid = autopayCharacter(scenario.db, scenario.character);
  setDoc(doc(scenario.db, "character", `${scenario.character.id}`), 
    scenario.character
  );
  return scenario.character.balanceSheet.amountPaid;
}

// Private, to be overridden by subclasses
export const processAnswer = (scenario: Scenario): void => {
  // Logic for performing calculations
  scenario.character.age += 1;
  scenario.character.networth += 5000;
  scenario.character.happiness *= 1.01;
  scenario.character.stress *= 1.01;
  scenario.character.health *= 1.01;
  scenario.character.security *= 1.01;
};

// Private, to be overridden by subclasses
export const generateCase = (scenario: Scenario): number => {
  // Logic for parsing user input and generating
  // a case depending on combination of selections.

  // Used in processAnswer to determine what calculation
  // to perform

  // e.g. if options 2 and 3 are selected, generate case 5

  // scenario.currentlySelectedOptions
  return 1;
};

// Private, validation check
export const canProceedWithMultipleSelection = (
  scenario: Scenario
): boolean => {
  return scenario.allowMultipleSelection && scenario.selections.length >= 1;
};

// Private, create new database instance
export const createOrUpdateDatabaseInstance = async (scenario: Scenario) => {
  await setDoc(
    doc(
      scenario.db,
      "character_scenario",
      `${scenario.character.id}_${scenario.currentPage}`
    ),
    {
      selections: scenario.selections,
      hasCompleted: scenario.hasCompleted,
    }
  );
};

export const updateCharacterDatabaseInstance = async (scenario: Scenario) => {
  console.log("After submission: " + scenario.hasCompleted);
  await setDoc(doc(scenario.db, "character", `${scenario.character.id}`), {
    ...scenario.character,
  });
};

// Private, creates a new database instance if it doesn't exist, if not,
// just loads regularly
export const getDatabaseSelections = async (scenario: Scenario) => {
  // if does not exist, create new
  const instanceRef = doc(
    scenario.db,
    "character_scenario",
    `${scenario.character.id}_${scenario.currentPage}`
  );
  await getDoc(instanceRef).then((instance) => {
    if (instance.exists()) {
      scenario.selectionsReady = true;
      scenario.selections = instance.data().selections;
      scenario.hasCompleted = instance.data().hasCompleted;
    } else {
      setDoc(instanceRef, {
        selections: scenario.selections,
        hasCompleted: scenario.hasCompleted,
      });
    }
  });
};

export const currentAssets = (scenario: Scenario): void => {
  const calculateYield = (currSum, asset) => {
    const diff = scenario.character.age - asset.startAge;
    if (diff >= asset.durationYears) {
      return (
        currSum +
        asset.amount * Math.pow(1 + asset.interest, asset.durationYears)
      );
    } else {
      return currSum + asset.amount * Math.pow(1 + asset.interest, diff);
    }
  };

  return scenario.character.balanceSheet.assets.reduce(calculateYield, 0);
};

export const currentLiabilities = (scenario: Scenario): void => {
  const calculateDebt = (currSum, liability) => {
    const diff = scenario.character.age - liability.startAge;
    if (diff >= liability.durationYears) {
      return currSum;
    } else {
      const total =
        liability.amount * (1 + liability.interest * liability.durationYears);
      const paid = (total / liability.durationYears) * diff;
      return currSum + total - paid;
    }
  };

  return scenario.character.balanceSheet.liabilities.reduce(calculateDebt, 0);
};
