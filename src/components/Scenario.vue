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

<script lang="ts">
import { getFirestore, doc, onSnapshot, Firestore } from "firebase/firestore"
import { defineComponent } from "vue";
import { Scenario } from "../classes/scenarios/Scenario";
import { ScenarioSelector } from "../classes/scenarios/ScenarioSelector";

export default defineComponent({
  props: ['pageid', 'userid', 'character', 'submitted'],
  emits: ['endGame'],
  data() {
    return {
      // Scenario and Phases
      heading: null as string,
      phase: null as string,
      title: null as string,
      body: null as string,
      allowMultipleSelection: false,
      options: [],

      // CharacterScenario Instance
      selectionsReady: false,
      characterScenario: null as Scenario,
      selections: [] as Array<number>,

      // Database
      db: null as Firestore,
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
        console.log("Submitted is " + isTrue);
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
    this.characterScenario = ScenarioSelector.getScenario(this.character, this.pageid);
    // this.characterScenario = new ScenarioOne(this.character, this.pageid, false);

    // Fetch and Listen on Scenario Content
    onSnapshot(doc(this.db, "scenario", `${this.pageid}`), (doc) => {
      if (doc.exists()) {
        const scenarioContent = doc.data();
        this.heading = scenarioContent.heading;
        this.phase = scenarioContent.phase;
        this.title = scenarioContent.title;
        this.body = scenarioContent.body;
        this.options = scenarioContent.options;
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
})
</script>

<style>
</style>