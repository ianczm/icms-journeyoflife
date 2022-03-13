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
      <li v-for="n in options.length" :key="n" @click="onOptionsClick" :option-id="n">
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
      docRef: null,
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
      const optionNumber = event.target.getAttribute("option-id");
      if (this.selections.includes(optionNumber)) {
            this.selections = this.selections.filter((option) => {
                return option != optionNumber;
            })
        } else {
            this.selections.push(optionNumber);
        }
      console.log(this.selections);
    }
  },
  // computed: {
  //   isActiveSelection(n) {
  //     // checks if current option number is selected
  //     return this.selections.includes(n);
  //   }
  // },
  created() {
    this.db = getFirestore();
  },
  mounted() {
    // Fetch and Listen on Scenario
    this.docRef = onSnapshot(doc(this.db, "scenario", `${this.pageid}`), (doc) => {
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