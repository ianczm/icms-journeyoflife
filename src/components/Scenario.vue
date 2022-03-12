<template>
    <div class="scenario-content">
        <div class="text">
            <h1>{{ heading }}</h1>
            <h2>
                <strong>{{ subheadingCode }}</strong>
                — {{ subheadingTitle }}
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
            <li v-for="n in 3" :key="n">
                <h3>Option {{ n }}</h3>
                <p v-if="optionsReady">{{ options[n].desc }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { getFirestore, collection, doc, getDoc } from "firebase/firestore"

export default {
    props: ['id'],
    data() {
        return {
            // Scenario and Phases
            heading: null,
            subheadingCode: null,
            subheadingTitle: null,
            body: null,
            allowMultipleSelection: false,
            options: [],
            optionsReady: false,

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
            this.subheadingCode = scenario.subheading.code;
            this.subheadingTitle = scenario.subheading.title;
            this.body = scenario.body;
            this.allowMultipleSelection = scenario.allowMultipleSelection;
            this.options = JSON.parse(JSON.stringify(scenario.options));
            console.log(this.options);
        }).then(this.optionsReady = true);
    }
}
</script>

<style>
</style>