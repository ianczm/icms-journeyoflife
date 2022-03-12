<template>
    <div class="character-stats">
        <div class="header">
            <h1>{{ characterName }}</h1>
            <h2>Age {{ characterAge }}</h2>
        </div>
        <div class="divider"></div>
        <div class="scores">
            <div class="final">
                <h3>Score</h3>
                <h1>{{ finalScore.toLocaleString() }}</h1>
            </div>
            <div class="net-worth">
                <h3>Net Worth</h3>
                <h1>RM {{ netWorth.toLocaleString() }}</h1>
            </div>
        </div>
        <div class="statistics">
            <div class="stats-bar-container">
                <p>Happiness</p>
                <div class="stats-bar happiness">
                    <div
                        class="inner-stats-bar happiness-progress"
                        :style="{ width: happiness * 100 + '%' }"
                    >{{ happiness * 100 + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Stress</p>
                <div class="stats-bar stress">
                    <div
                        class="inner-stats-bar stress-progress"
                        :style="{ width: stress * 100 + '%' }"
                    >{{ stress * 100 + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Health</p>
                <div class="stats-bar health">
                    <div
                        class="inner-stats-bar health-progress"
                        :style="{ width: health * 100 + '%' }"
                    >{{ health * 100 + '%' }}</div>
                </div>
            </div>
            <div class="stats-bar-container">
                <p>Security</p>
                <div class="stats-bar security">
                    <div
                        class="inner-stats-bar security-progress"
                        :style="{ width: security * 100 + '%' }"
                    >{{ security * 100 + '%' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Character Data
            characterName: 'Max',
            characterAge: 15,
            finalScore: 0,
            netWorth: 5000,
            happiness: 0.5,
            stress: 0.5,
            health: 0.5,
            security: 0.5,
        }
    }
}
</script>

<style>
</style>