<template>
    <div class="scenario builder">
        <h3 class="table-title">Scenario Builder</h3>
        <form>
            <div class="pageid form-group">
                <label>Page ID</label>
                <input v-model="pageid" type="number" />
            </div>
            <div class="heading form-group">
                <label>Heading</label>
                <input v-model="heading" type="text" />
            </div>
            <div class="phase form-group">
                <label>Phase</label>
                <input v-model="phase" type="text" />
            </div>
            <div class="title form-group">
                <label>Title</label>
                <input v-model="title" type="text" />
            </div>
            <div class="body form-group">
                <label>Body</label>
                <textarea v-model="body" type="text" />
            </div>
            <div class="options form-group">
                <label>Options</label>
                <div class="results table-container">
                    <table class="table options-builder">
                        <tr class="header">
                            <th>Option ID</th>
                            <th>Description</th>
                            <th>Outcome</th>
                            <th>+/-</th>
                        </tr>
                        <tr v-for="option in options" :key="option.optionid" class="record">
                            <td>{{ option.optionid }}</td>
                            <td>{{ option.desc }}</td>
                            <td>{{ option.outcome }}</td>
                            <td>
                                <button
                                    class="add glow-button"
                                    @click.prevent="deleteOption"
                                    :option-id="option.optionid"
                                >Del</button>
                            </td>
                        </tr>
                        <tr class="record">
                            <td>
                                <input v-model="inputOptionId" type="number" />
                            </td>
                            <td>
                                <textarea v-model="inputOptionDesc" type="text" />
                            </td>
                            <td>
                                <textarea v-model="inputOptionOutcome" type="text" />
                            </td>
                            <td>
                                <button @click.prevent="addOption" class="add glow-button">Add</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <button class="glow-button" @click.prevent="submitScenario">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Firestore, getFirestore } from "@firebase/firestore";
import { defineComponent } from "@vue/runtime-core"
import { ScenarioContent, Options, retrieveScenarioFromDatabase } from "../../classes/ScenarioContent"

export default defineComponent({
    data() {
        return {
            pageid: 0 as number,
            heading: "" as string,
            phase: "" as string,
            title: "" as string,
            body: "" as string,
            options: [] as Array<Options>,

            inputOptionId: null as number,
            inputOptionDesc: "" as string,
            inputOptionOutcome: "" as string,

            db: null as Firestore
        }
    },
    beforeMount() {
        const sampleScenario = retrieveScenarioFromDatabase(this.db, 1);
        sampleScenario.then(sample => {
            this.pageid = sample.pageid;
            this.heading = sample.heading;
            this.phase = sample.phase;
            this.title = sample.title;
            this.body = sample.body;
            this.options = sample.options;
        })
    },
    created() {
        this.db = getFirestore();
    },
    methods: {
        deleteOption(e) {
            const optionid = parseInt(e.target.getAttribute("option-id"));
            this.options = this.options.filter((option: Options) => {
                return (option.optionid != optionid);
            })
        },
        addOption() {
            const option = new Options(
                this.inputOptionId,
                this.inputOptionDesc,
                this.inputOptionOutcome
            );
            this.options.push(option);

            // Reset fields
            this.inputOptionId = "";
            this.inputOptionDesc = "";
            this.inputOptionOutcome = "";
        },
        submitScenario() {
            const scenarioContent = new ScenarioContent(
                this.pageid,
                this.heading,
                this.phase,
                this.title,
                this.body,
                this.options
            );
            scenarioContent.updateDatabase(this.db);
        }
    }
});
</script>

<style lang="scss">
@import "../../assets/scss/global";
.scenario.builder {
    form {
        @include createGlass();
        padding: 50px;
        border-radius: 25px;
        display: grid;
        grid-gap: 15px;
        grid-template-columns: 3fr 5fr;
        grid-template-areas: "pageid heading" "phase title" "body body" "options options";
        text-align: left;

        .form-group {
            label {
                display: block;
                margin-right: 10px;
            }
            input {
                height: 30px;
            }
            textarea,
            input {
                border-radius: 5px;
                border: none;
                background: rgba(white, 0.1);
                font-family: $poppins;
                padding: 5px;
                color: white;
                &:focus {
                    outline: $yellow 1px solid;
                }
                &::selection {
                    background: rgba($yellow, 0.3);
                }
            }
            &:not(.body, .options) > input {
                width: 80%;
            }
            &.body {
                grid-area: body;
                textarea {
                    width: 80%;
                    height: 200px;
                }
            }
            &.options {
                grid-area: options;

                .results {
                    ul {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                    }
                }
            }

            .record {
                &:hover {
                    background: none;
                }
            }
        }
    }
}
</style>