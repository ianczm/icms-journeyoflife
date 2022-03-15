<template>
  <div class="scenario-template">
    <div class="scenario-content">
      <div class="text">
        <h1>
          {{ heading }}
          <span v-if="submitted">Outcome</span>
        </h1>
        <h2>
          <strong>{{ phase }}</strong>
          — {{ title }}
        </h2>
        <div class="divider"></div>
        <p v-if="!submitted">{{ body }}</p>
        <p v-else>{{ options[selections[0] - 1].outcome }}</p>
      </div>
    </div>
    <!-- <div v-if="allowMultipleSelection" class="mcq-alert">
    <i class="fa-solid fa-circle-exclamation"></i>
    <span>You may select multiple options.</span>
    </div>-->
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
  </div>
</template>

<script>
import { getFirestore, doc, onSnapshot } from "firebase/firestore"
import { ScenarioOne } from "/src/classes/scenarios/ScenarioOne";

export default {
  props: ['pageid', 'userid', 'character', 'submitted'],
  emits: ['endGame'],
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
  methods: {
    onOptionsClick(event) {
      const optionNumber = parseInt(event.target.getAttribute("option-id"));
      this.characterScenario.updateSelectedOptions(optionNumber);
    },
    isActiveSelection(n) {
      // checks local variable which is synced with firebase
      return this.selections.includes(n);
    },
    onSubmitClick() {
      if (this.submitted) {
        this.characterScenario.submitAnswer();
      }
    }
  },
  watch: {
    submitted(isTrue) {
      if (isTrue) {
        this.characterScenario.submitAnswer();
      } else {
        console.log("Submitted is " + isTrue)
      }
    }
  },
  created() {
    this.db = getFirestore();
  },
  async beforeMount() {

    console.log("Before mount pageid is " + this.pageid);
    // Initialise scenario
    // might need a scenario factory here
    this.characterScenario = new ScenarioOne(this.character, this.pageid, false);

    // Fetch and Listen on Scenario Content
    this.scenarioContentSnapshot = onSnapshot(doc(this.db, "scenario", `${this.pageid}`), (doc) => {
      if (doc.exists()) {
        this.scenarioContent = doc.data();
        this.heading = this.scenarioContent.heading;
        this.phase = this.scenarioContent.phase;
        this.title = this.scenarioContent.title;
        this.body = this.scenarioContent.body;
        this.options = this.scenarioContent.options;
      } else {
        // indicates that the game has ended
        this.$emit('endGame');
      }
    });

    // load in existing selections
    onSnapshot(doc(this.db, "character_scenario", `${this.character.id}_${this.pageid}`), (selectionSnapshot) => {
      if (selectionSnapshot.exists()) {
        this.selections = selectionSnapshot.data().selections;
      } else {
        this.selections = [];
      }
    });
  },
}
</script>

<style>
</style>