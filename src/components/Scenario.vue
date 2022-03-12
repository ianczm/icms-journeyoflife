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
    <div v-if="allowMultipleSelection" class="mcq-alert">
        <i class="fa-solid fa-circle-exclamation"></i>
        <span>You may select multiple options.</span>
    </div>
    <div class="choices">
        <ul>
            <li v-for="n in options.length" :key="n">
                <h3>Option {{ n }}</h3>
                <p v-if="isOptionsReady">{{ options[n-1] }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore"

export default {
    props: ['id'],
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
    created() {
        this.db = getFirestore();
    },
    async mounted() {
        // Fetch Scenario
        this.docRef = doc(this.db, "scenario", `${this.id}`);
        await getDoc(this.docRef).then((snapshot) => {
            const scenario = snapshot.data();
            this.heading = scenario.heading;
            this.phase = scenario.phase;
            this.title = scenario.title;
            this.body = scenario.body;
            this.allowMultipleSelection = scenario.allowMultipleSelection;
            this.options = scenario.options;
        }).then(this.isOptionsReady = !!this.options);
    }
}
</script>

<style>
</style>