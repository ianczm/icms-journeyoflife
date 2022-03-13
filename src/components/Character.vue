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
                <h1>{{ character.score.toLocaleString() }}</h1>
            </div>
            <div class="net-worth">
                <h3>Net Worth</h3>
                <h1>RM {{ character.networth.toLocaleString() }}</h1>
            </div>
        </div>
        <div class="statistics">
            <div class="stats-bar-container">
                <p>Happiness</p>
                <div class="stats-bar happiness">
                    <div
                        class="inner-stats-bar happiness-progress"
                        :style="{ width: character.happiness * 100 + '%' }"
                    >{{ character.happiness * 100 + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Stress</p>
                <div class="stats-bar stress">
                    <div
                        class="inner-stats-bar stress-progress"
                        :style="{ width: character.stress * 100 + '%' }"
                    >{{ character.stress * 100 + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Health</p>
                <div class="stats-bar health">
                    <div
                        class="inner-stats-bar health-progress"
                        :style="{ width: character.health * 100 + '%' }"
                    >{{ character.health * 100 + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Security</p>
                <div class="stats-bar security">
                    <div
                        class="inner-stats-bar security-progress"
                        :style="{ width: character.security * 100 + '%' }"
                    >{{ character.security * 100 + '%' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Character } from "src/classes/Character.js";

export default {
    data() {
        return {
            character: new Character()
        }
    }
}
</script>

<style>
</style>