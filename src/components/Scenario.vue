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
      characterScenario: new ScenarioOne(this.character),

      // Database
      db: null,
      scenarioSnapshot: null,
      scenarioContent: null
    }
  },
  computed: {
    showMultipleSelection() {
      return this.allowMultipleSelection ? "block" : "none";
    }
  },
  methods: {
    onOptionsClick(event) {
      const optionNumber = parseInt(event.target.getAttribute("option-id"));
      this.characterScenario.updateSelectedOptions(optionNumber);
    },
    isActiveSelection(n) {
      // checks if current option number is selected
      return this.characterScenario.selections.includes(n);
    }
  },
  created() {
    this.db = getFirestore();
  },
  mounted() {
    // Fetch and Listen on Scenario
    this.scenarioSnapshot = onSnapshot(doc(this.db, "scenario", `${this.characterScenario.currentPage}`), (doc) => {
      this.scenarioContent = doc.data();
      // console.log(this.scenario);
      this.heading = this.scenarioContent.heading;
      this.phase = this.scenarioContent.phase;
      this.title = this.scenarioContent.title;
      this.body = this.scenarioContent.body;
      this.allowMultipleSelection = this.scenarioContent.allowMultipleSelection;
      this.options = this.scenarioContent.options;
    });
  }
}
</script>

<style>
</style>