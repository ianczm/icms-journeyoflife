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

export default {
  props: ['pageid', 'userid'],
  data() {
    return {
      // Scenario and Phases
      heading: null,
      phase: null,
      title: null,
      body: null,
      allowMultipleSelection: false,
      options: [],
      selections: [],
      isOptionsReady: false,

      // Database
      db: null,
      scenarioSnapshot: null,
      scenario: null
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
      console.log(this.selections);
    },
    isActiveSelection(n) {
      // checks if current option number is selected
      return this.selections.includes(n);
    }
  },
  created() {
    this.db = getFirestore();
  },
  mounted() {
    // Fetch and Listen on Scenario
    this.scenarioSnapshot = onSnapshot(doc(this.db, "scenario", `${this.pageid}`), (doc) => {
      this.scenario = doc.data();
      // console.log(this.scenario);
      this.heading = this.scenario.heading;
      this.phase = this.scenario.phase;
      this.title = this.scenario.title;
      this.body = this.scenario.body;
      this.allowMultipleSelection = this.scenario.allowMultipleSelection;
      this.options = this.scenario.options;
    });
  }
}
</script>

<style>
</style>