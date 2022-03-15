<template>
  <div class="scenario-content">
    <div class="text">
      <h1>{{ heading }} <span v-if="submitted">Outcome</span></h1>
      <h2>
        <strong>{{ phase }}</strong>
        — {{ title }}
      </h2>
      <div class="divider"></div>
      <p v-if="!submitted">{{ body }}</p>
      <p v-else>{{ options[selections[0]-1].outcome }}</p>
    </div>
  </div>
  <!-- <div v-if="allowMultipleSelection" class="mcq-alert">
    <i class="fa-solid fa-circle-exclamation"></i>
    <span>You may select multiple options.</span>
  </div> -->
  <div v-if="!submitted" class="choices">
    <ul>
      <li
        v-for="n in options.length"
        :key="n"
        @click="onOptionsClick"
        :option-id="n"
        :class="{ active: isActiveSelection(n) }"
      >
        <h3 :option-id="n">Option {{ n }}</h3>
        <p :option-id="n">{{ options[n - 1].desc }}</p>
      </li>
    </ul>
  </div>
  <Teleport to=".section.game">
    <div class="submission">
      <button v-if="!submitted" class="glow-button" @click="onSubmitClick">Submit Answer</button>
      <button v-else class="glow-button" @click="onNextClick">Next</button>
    </div>
  </Teleport>
</template>

<script>
import { getFirestore, doc, onSnapshot } from "firebase/firestore"
import { ScenarioOne } from "/src/classes/scenarios/ScenarioOne.js";

export default {
  props: ['pageid', 'userid', 'character'],
  data() {
    return {
      // Scenario and Phases
      heading: null,
      phase: null,
      title: null,
      body: null,
      allowMultipleSelection: false,
      options: [],

      // CharacterScenario Instance
      selectionsReady: false,
      characterScenario: null,
      selections: [],
      submitted: false,

      // Database
      db: null,
      selectionsSnapshot: null,
      scenarioContentSnapshot: null,
      scenarioContent: null
    }
  },
  // computed: {
  //   showMultipleSelection() {
  //     return this.allowMultipleSelection ? "flex" : "none";
  //   },
  // },
  methods: {
    onOptionsClick(event) {
      const optionNumber = parseInt(event.target.getAttribute("option-id"));
      this.characterScenario.updateSelectedOptions(optionNumber);
    },
    isActiveSelection(n) {
      // checks local variable which is synced with firebase
      return this.selections.includes(n);
    },
    onSubmitClick(event) {
      this.characterScenario.submitAnswer();
      this.submitted = true;
    },
    onNextClick(event) {
      alert("Next");
    }
  },
  created() {
    this.db = getFirestore();
  },
  async beforeMount() {
    // Initialise scenario
    this.characterScenario = new ScenarioOne(this.character, this.pageid, this);

    // Fetch and Listen on Scenario Content
    this.scenarioContentSnapshot = onSnapshot(doc(this.db, "scenario", `${this.pageid}`), (doc) => {
      this.scenarioContent = doc.data();
      this.heading = this.scenarioContent.heading;
      this.phase = this.scenarioContent.phase;
      this.title = this.scenarioContent.title;
      this.body = this.scenarioContent.body;
      this.allowMultipleSelection = this.scenarioContent.allowMultipleSelection;
      this.options = this.scenarioContent.options;
      // added pageid and isquestion as properties
      // should add assets and liabilities
      // assets = {value, interest, interestDuration}
    });

    onSnapshot(doc(this.db, "character_scenario", `${this.character.id}_${this.pageid}`), (selectionSnapshot) => {
      var snapData = selectionSnapshot.data();
      this.selections = snapData.selections;
    })
  },
}
</script>

<style>
</style>