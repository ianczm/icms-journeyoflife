<template>
  <div class="scenario-content">
    <div class="text">
      <h1>{{ heading }}</h1>
      <h2>
        <strong>{{ phase }}</strong>
        — {{ title }}
      </h2>
      <div class="divider"></div>
      <p>{{ body }}</p>
    </div>
  </div>
  <div :style="{ display: showMultipleSelection }" class="mcq-alert">
    <i class="fa-solid fa-circle-exclamation"></i>
    <span>You may select multiple options.</span>
  </div>
  <div class="choices">
    <ul>
      <li
        v-for="n in options.length"
        :key="n"
        @click="onOptionsClick"
        :option-id="n"
        :class="{ active: isActiveSelection(n) }"
      >
        <h3 :option-id="n">Option {{ n }}</h3>
        <p :option-id="n">{{ options[n - 1] }}</p>
      </li>
    </ul>
  </div>
  <Teleport to=".section.game">
    <div class="submission">
      <button class="glow-button" @click="onSubmitClick">Submit Answer</button>
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

      // Database
      db: null,
      selectionsSnapshot: null,
      scenarioContentSnapshot: null,
      scenarioContent: null
    }
  },
  computed: {
    showMultipleSelection() {
      return this.allowMultipleSelection ? "flex" : "none";
    },
  },
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