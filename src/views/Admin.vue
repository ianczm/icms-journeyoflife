<template>
  <div class="nav-spacer" ref="nav-spacer"></div>
  <div class="outer-container">
    <div class="section admin">
      <div class="inner-container">
        <div class="text">
          <h1>Admin Panel</h1>
        </div>
        <div id="character database">
          <h3 class="table-title">Character Database</h3>
          <div class="table-container">
            <table class="table existing">
              <tr class="character header">
                <!-- <th>username</th> -->
                <th>Group</th>
                <!-- <th>userid</th> -->
                <th>Page</th>
                <th>Age</th>
                <th>Networth</th>
                <th>Score</th>
                <th>Happiness</th>
                <th>Stress</th>
                <th>Health</th>
                <th>Security</th>
              </tr>
              <tr v-for="character in characters" :key="character.userid" class="character record">
                <!-- <td>{{ character.username }}</td> -->
                <td>{{ character.id }}</td>
                <!-- <td>{{ character.userid }}</td> -->
                <td>{{ character.currentpage }}</td>
                <td>{{ character.age }}</td>
                <td>{{ ('RM ' + character.networth.toLocaleFixed(2)) }}</td>
                <td>{{ character.score.toLocaleFixed(2) }}</td>
                <td>{{ (character.happiness * 100).toFixed(1) + '%' }}</td>
                <td>{{ (character.stress * 100).toFixed(1) + '%' }}</td>
                <td>{{ (character.health * 100).toFixed(1) + '%' }}</td>
                <td>{{ (character.security * 100).toFixed(1) + '%' }}</td>
              </tr>
            </table>
          </div>
          <div class="panel">
            <button @click="resetAllCharacters" class="glow-button">Reset Characters</button>
            <button @click="resetCharacterScenarios" class="glow-button">Reset Selected Options</button>
          </div>
        </div>
        <div id="scenario database">
          <h3 class="table-title">Scenario Database</h3>
          <div class="table-container">
            <table class="table scenario">
              <tr class="scenario header">
                <th>pageid</th>
                <th>heading</th>
                <th>phase</th>
                <th>title</th>
                <th>body</th>
                <th>options</th>
              </tr>
              <tr v-for="scenario in scenarios" :key="scenario.pageid" class="scenario record">
                <td>{{ scenario.pageid }}</td>
                <td>{{ scenario.heading }}</td>
                <td>{{ scenario.phase }}</td>
                <td>{{ scenario.title }}</td>
                <td>{{ scenario.body }}</td>
                <td style="width: 50%">
                  <ul>
                    <li v-for="option in scenario.options" :key="option.optionid">
                      <p><strong>Option {{ option.optionid }}</strong></p>
                      <p>{{ option.desc }}</p>
                      <p style="color: #ffbb00; font-weight: 400">{{ option.outcome }}</p>
                    </li>
                  </ul>
                </td>
              </tr>
            </table>
          </div>
          <div class="panel">
            <button @click="duplicateScenario" class="glow-button">Duplicate Scenario</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderBy, query, doc, setDoc, getFirestore, collection, onSnapshot, getDocs, deleteDoc } from "firebase/firestore"
import { Character, useridList } from "/src/classes/Character";

// For presentation convenience
Number.prototype.toLocaleFixed = function (n) {
  return this.toLocaleString(undefined, {
    minimumFractionDigits: n,
    maximumFractionDigits: n
  });
};

export default {
  data() {
    return {
      // Database
      db: null,
      colRef: null,
      characters: [],
      scenarios: [],
    }
  },
  created() {
    this.db = getFirestore();
  },
  methods: {
    resetAllCharacters() {

      async function setDocs(db, characterid, userid) {
        await setDoc(
          doc(db, "character", `${characterid}`),
          { ...new Character(userid, characterid) }
        );
      }

      for (var i = 0; i < useridList.length; i++) {
        setDocs(this.db, i + 1, useridList[i]);
      }
    },
    async resetCharacterScenarios() {
      // console.log("Fix reset!")
      const csCollection = collection(this.db, "character_scenario");
      await getDocs(csCollection).then(csSnapshot => {
        csSnapshot.forEach(cs => {
          deleteDoc(cs.ref);
        });
      });
    },
    async duplicateScenario() {
      await setDoc(
        doc(this.db, "scenario", `${this.scenarios.length+1}`), {
          ...this.scenarios[this.scenarios.length-1],
          pageid: this.scenarios.length+1
        }
      );
    }
  },
  beforeMount() {
    var characterArray;
    const cQ = query(
      collection(this.db, "character"),
      orderBy("score", "desc"),
      // orderBy("networth", "desc")
    );
    this.colRef = onSnapshot(cQ, (characters) => {
      characterArray = [];
      characters.forEach((character) => {
        characterArray.push({ ...character.data() });
      })
      this.characters = characterArray;
    });

    var scenarioArray;
    const sQ = query(
      collection(this.db, "scenario"),
      orderBy("pageid", "asc"),
      // orderBy("networth", "desc")
    );
    this.colRef = onSnapshot(sQ, (scenarios) => {
      scenarioArray = [];
      scenarios.forEach((scenario) => {
        scenarioArray.push({ ...scenario.data() });
      })
      this.scenarios = scenarioArray;
    });
  }
}


</script>

<style lang="scss">
@import "/src/assets/scss/_global.scss";

.admin.section {
  .text {
    h1 {
      font-size: 2.5rem;
    }
  }
  width: 80vw;
  * {
    margin: 0;
  }
  h4,
  .inner-container > * {
    & > * {
      margin-bottom: 25px;
    }
  }
  .table-title {
    margin-bottom: 15px;
  }
  .table {
    width: 100%;
    text-align: left;
    border-spacing: 1px;
    font-size: 0.85rem;
    cursor: pointer;

    .record:hover {
      background: rgba($yellow, 0.5);
      transition: background 0.05s ease;
    }

    .header > * {
      background: $yellow;
      color: $dark;
      font-weight: 600;
      padding: 6px;
      border-radius: 2px;
    }
    .record > * {
      background: rgba($dark, 0.2);
      padding: 6px;
      border-radius: 2px;
      &::selection {
        background: rgba($yellow, 0.5);
      }

      ul {
        list-style: none;
        & > *:not(:last-child) {
          margin-bottom: 2rem;
        }
      }

      p {
        font-size: 0.85rem;
        margin-bottom: 0.5rem;
      }
    }
  }
  .panel {
    text-align: center;
    @include spaceChildren(15px);
    .glow-button {
      border: none;
      font-size: 0.85rem;
    }
  }
  .table.scenario {
    td {
      vertical-align: top;
    }
  }
}
</style>