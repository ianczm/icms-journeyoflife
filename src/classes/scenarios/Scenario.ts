import { Character } from '../character/Character';
import { getFirestore, doc, setDoc, getDoc, Firestore } from "firebase/firestore";


// Usage Flow
// 1. create new scenario, constructing with character as the one to be modified
// 2. listen for options selected via updateSelectedOptions()
//      - perform realtime database update
// 3. listen for answer submission via submitAnswer()
//      - check if multiple options are selected
//      - processes selected options --> calculation done here
//      - updates character and history
// 4. always listen for firebase updates e.g. allowMultipleSelections

class Scenario {

  db: Firestore;
  character: Character;
  currentPage: number;
  selectionsReady: boolean;
  selections: Array<number>;
  allowMultipleSelection: boolean;

  constructor(character: Character, currentPage: number, allowMultipleSelection: boolean) {

    // Initialise firebase
    this.db = getFirestore();

    // Reference the original character object
    this.character = character;

    // Scenario current page
    this.currentPage = currentPage;
    // Update current page of character
    // [!] need to find out how to update currentPage in the database

    // User selected options
    this.selectionsReady = false;
    this.selections = [];
    this.getDatabaseSelections();

    this.allowMultipleSelection = allowMultipleSelection;
  }

  // Public, onClick event
  updateSelectedOptions(optionNumber: number) {
    // To update the database as participants select options
    // to be displayed to others in real time

    if (this.selections.includes(optionNumber)) {
      // toggle behavior: deactivate selection if already active
      this.selections = this.selections.filter((option) => {
        return option != optionNumber;
      })
    } else {
      // normal behavior, add option
      if (this.selections && this.allowMultipleSelection) {
        // if there is another selection already, check if ms is enabled
        this.selections.push(optionNumber);
      } else {
        // if not, set first element to optionNumber
        this.selections[0] = optionNumber;
      }
    }
    // Update database with options

    this.createOrUpdateDatabaseInstance();

  }

  // Public, onClick event
  submitAnswer() {
    // Perform multiple selection validation
    try {
      if (!this.selections) {
        throw {
          name: "NoSelectionError",
          message: "Please choose at least one option."
        }
      } else if (this.selections.length > 1 && !this.allowMultipleSelection) {
        throw {
          name: "MultipleSelectionError",
          message: "You may only choose one option."
        }
      }

      // Proceed with answer processing
      this.processAnswer();
      // Update character upon submit after perfoming
      // logic and calculations
      this.character.score = this.calculateScore();

      // Find a way to update the database
      this.updateCharacterDatabaseInstance();

    } catch (e) {
      // Somehow render this to HTML
      alert(e.name + " " + e.message);
    }
  }

  calculateScore(): number {

    // cap quality of life at 2
    var qualityOfLife = (this.character.happiness + 1 - this.character.stress);

    // Perform score base calculation
    var score = this.character.networth * qualityOfLife * this.character.health * this.character.security;

    var bonus = this.handleScoreOverflow();

    // return the modified score after weighting by bonusBuffer
    // will either be a small increase or decrease
    return bonus * score;
  }

  handleScoreOverflow(): number {
    // in case there is overflow, these 4 metrics will add a bonus
    // to final score (which can be negative if the overflow left-sided)
    // positive overflow > 0
    // negative overflow < -1
    var healthOverflow = this.character.health - 1;
    var securityOverflow = this.character.security - 1;
    var happinessOverflow = this.character.happiness - 1;
    var stressOverflow = this.character.stress - 1;

    // if positive overflow, set to 1, else if negative overflow, set to 0, else no change
    if (healthOverflow > 0) {
      this.character.health = 1;
    } else if (healthOverflow < -1) {
      this.character.health = 0;
    } else {
      healthOverflow = 0;
    }
    if (securityOverflow > 0) {
      this.character.security = 1;
    } else if (securityOverflow < -1) {
      this.character.security = 0;
    } else {
      securityOverflow = 0;
    }
    if (happinessOverflow > 0) {
      this.character.happiness = 1;
    } else if (happinessOverflow < -1) {
      this.character.happiness = 0;
    } else {
      happinessOverflow = 0;
    }
    if (stressOverflow > 0) {
      this.character.stress = 1;
    } else if (stressOverflow < -1) {
      this.character.stress = 0;
    } else {
      stressOverflow = 0;
    }

    // average
    var bonus = (0.25 * (healthOverflow + securityOverflow + happinessOverflow + stressOverflow)) + 1;
    return bonus;
  }

  // Private, to be overridden by subclasses
  processAnswer(): void {
    // Logic for performing calculations
  }

  // Private, to be overridden by subclasses
  generateCase(): void {
    // Logic for parsing user input and generating
    // a case depending on combination of selections.

    // Used in processAnswer to determine what calculation
    // to perform

    // e.g. if options 2 and 3 are selected, generate case 5

    // this.currentlySelectedOptions
  }

  // Private, validation check
  canProceedWithMultipleSelection(): boolean {
    return this.allowMultipleSelection && this.selections.length >= 1;
  }

  // Private, create new database instance
  async createOrUpdateDatabaseInstance() {
    await setDoc(doc(this.db, "character_scenario", `${this.character.id}_${this.currentPage}`), {
      selections: this.selections,
    });
  }

  async updateCharacterDatabaseInstance() {
    await setDoc(doc(this.db, "character", `${this.character.id}`), {
      ...this.character
    });
  }

  // Private, creates a new database instance if it doesn't exist, if not,
  // just loads regularly
  async getDatabaseSelections() {
    // if does not exist, create new
    const instanceRef = doc(this.db, "character_scenario", `${this.character.id}_${this.currentPage}`);
    await getDoc(instanceRef).then((instance) => {
      if (instance.exists()) {
        this.selectionsReady = true;
        this.selections = instance.data().selections;
      } else {
        setDoc(instanceRef, {
          selections: this.selections
        });
      }
    });
  }


  currentAssets() {
    const calculateYield = (currSum, asset) => {
      const diff = this.character.age - asset.startAge;
      if (diff >= asset.durationYears) {
        return (
          currSum +
          asset.amount * Math.pow(1 + asset.interest, asset.durationYears)
        );
      } else {
        return currSum + asset.amount * Math.pow(1 + asset.interest, diff);
      }
    };

    return this.character.assets.reduce(calculateYield, 0);
  }

  currentLiabilities() {
    const calculateDebt = (currSum, liability) => {
      const diff = this.character.age - liability.startAge;
      if (diff >= liability.durationYears) {
        return currSum;
      } else {
        const total =
          liability.amount * (1 + liability.interest * liability.durationYears);
        const paid = (total / liability.durationYears) * diff;
        return currSum + total - paid;
      }
    };

    return this.character.liabilities.reduce(calculateDebt, 0);
  }
}

export { Scenario };
