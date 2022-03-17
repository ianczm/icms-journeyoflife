<template>
    <div class="character-stats">
        <div class="header">
            <h1>Max</h1>
            <h2>Age {{ character.age }}</h2>
        </div>
        <div class="divider"></div>
        <div class="scores">
            <div class="final">
                <h3>Score</h3>
                <h1>{{ toLocalFixed(character.score, 2) }}</h1>
            </div>
            <div class="net-worth">
                <h3>Net Worth</h3>
                <h1>RM {{ toLocalFixed(character.networth, 2) }}</h1>
            </div>
        </div>
        <div class="statistics">
            <div class="stats-bar-container">
                <p>Happiness</p>
                <div class="stats-bar happiness">
                    <div
                        class="inner-stats-bar happiness-progress"
                        :style="{ width: character.happiness * 100 + '%' }"
                    >{{ (character.happiness * 100).toFixed(0) + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Stress</p>
                <div class="stats-bar stress">
                    <div
                        class="inner-stats-bar stress-progress"
                        :style="{ width: character.stress * 100 + '%' }"
                    >{{ (character.stress * 100).toFixed(0) + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Health</p>
                <div class="stats-bar health">
                    <div
                        class="inner-stats-bar health-progress"
                        :style="{ width: character.health * 100 + '%' }"
                    >{{ (character.health * 100).toFixed(0) + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Security</p>
                <div class="stats-bar security">
                    <div
                        class="inner-stats-bar security-progress"
                        :style="{ width: character.security * 100 + '%' }"
                    >{{ (character.security * 100).toFixed(0) + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Page&nbsp;&nbsp;&nbsp;{{character.currentpage}} / {{maxPages}}</p>
                <div class="stats-bar security">
                    <div
                        class="inner-stats-bar security-progress"
                        :style="{ width: pageProgress * 100 + '%' }"
                    >{{ (pageProgress * 100).toFixed(0) + '%' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { collection, Firestore, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { defineComponent } from "vue";
import { ScenarioContent } from "../classes/scenarios/ScenarioContent";

export default defineComponent({
    props: ['character'],
    data() {
        return {
            maxPages: 32 as number,
            db: null as Firestore
        }
    },
    methods: {
        // For presentation convenience
        toLocalFixed(n: number, digits: number) {
            return n.toLocaleString(undefined, {
                minimumFractionDigits: digits,
                maximumFractionDigits: digits
            });
        },
    },
    computed: {
        pageProgress() {
            return this.character.currentpage / this.maxPages;
        }
    },
    created() {
        this.db = getFirestore();
    },
    async beforeMount() {
        const q = query(collection(this.db, "scenario"), orderBy("pageid", "desc"), limit(1));
        const scenarios = await getDocs(q).then();
        scenarios.forEach((scenarioSnap) => {
            const scenario = scenarioSnap.data() as ScenarioContent;
            this.maxPages = scenario.pageid;
        })
    }
})
</script>

<style>
</style>