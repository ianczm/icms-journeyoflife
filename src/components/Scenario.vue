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
    <div :style="{display: showMultipleSelection}" class="mcq-alert">
        <i class="fa-solid fa-circle-exclamation"></i>
        <span>You may select multiple options.</span>
    </div>
    <div class="choices">
        <ul>
            <li v-for="n in options.length" :key="n">
                <h3>Option {{ n }}</h3>
                <p>{{ options[n-1] }}</p>
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