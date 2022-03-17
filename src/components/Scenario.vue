<template>
  <div class="scenario-template">
    <div class="scenario-content">
      <div class="text">
        <h1>
          {{ heading }}
          <span v-if="showOutcome">Outcome</span>
        </h1>
        <h2>
          <strong>{{ phase }}</strong>
          — {{ title }}
        </h2>
        <div class="divider"></div>
        <p v-if="!showOutcome">{{ body }}</p>
        <p v-else>{{ options[selections[0] - 1].outcome }}</p>
      </div>
    </div>
    <!-- <div v-if="allowMultipleSelection" class="mcq-alert">
    <i class="fa-solid fa-circle-exclamation"></i>
    <span>You may select multiple options.</span>
    </div>-->
    <div v-if="!showOutcome" class="choices">
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
import { autopayCharacter } from "../utils/CharacterUtils";

export default defineComponent({
  props: ['pageid', 'character', 'submitted'],
  emits: ['endGame', 'showOutcome', 'doNotShowOutcome'],
  data() {
    return {
      // Scenario and Phases
      scenarioAge: 0 as number,
      heading: null as string,
      phase: null as string,
      title: null as string,
      body: null as string,
      allowMultipleSelection: false as boolean,
      options: [],

      // CharacterScenario Instance
      selectionsReady: false as boolean,
      characterScenario: null as Scenario,
      selections: [] as Array<number>,
      hasCompleted: false as boolean,
      amountPaid: 0 as number,

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
  computed: {
    showOutcome() {
      return this.submitted || this.hasCompleted;
    }
  },
  watch: {
    submitted(isClicked) {
      if (isClicked) {
        this.characterScenario.submitAnswer();
      }
    },
  },
  created() {
    this.db = getFirestore();
  },
  async beforeMount() {

    // Initialise scenario
    // might need a scenario factory here
    this.characterScenario = ScenarioSelector.getScenario(this.character, this.pageid);
    // this.characterScenario = new ScenarioOne(this.character, this.pageid, false);

    // Fetch and Listen on Scenario Content
    onSnapshot(doc(this.db, "scenario", `${this.pageid}`), (doc) => {
      if (doc.exists()) {
        const scenarioContent = doc.data();
        // for display
        this.scenarioAge = scenarioContent.scenarioAge;

        this.heading = scenarioContent.heading;
        this.phase = scenarioContent.phase;
        this.title = scenarioContent.title;
        this.body = scenarioContent.body;
        this.options = scenarioContent.options;

        // for updating character age
        this.character.age = scenarioContent.scenarioAge;
        // auto pay when age updates
        this.amountPaid = autopayCharacter(this.character.balanceSheet);
      } else {
        // indicates that the game has ended
        this.$emit('endGame');
      }
    });

    // load in existing selections
    onSnapshot(doc(this.db, "character_scenario", `${this.character.id}_${this.pageid}`), (selectionSnapshot) => {
      if (selectionSnapshot.exists()) {
        const data = selectionSnapshot.data() as Scenario;
        this.selections = data.selections;
        this.hasCompleted = data.hasCompleted;
        if (this.hasCompleted) {
          this.$emit('showOutcome');
        } else {
          this.$emit('doNotShowOutcome');
        }
      } else {
        this.selections = [];
      }
    });
  },
})
</script>

<style>
</style>