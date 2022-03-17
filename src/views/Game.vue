<template>
  <div class="nav-spacer"></div>
  <div class="outer-container">
    <div class="section game">
      <div class="game-panel">
        <CharacterStats v-if="character" :character="character" />
        <Scenario
          v-if="character && !endGame"
          :character="character"
          :pageid="character.currentpage"
          :submitted="submitted"
          :key="character.currentpage"
          @end-game="triggerEndGame"
          @show-outcome="enableShowOutcome"
          @do-not-show-outcome="disableShowOutcome"
        />
        <div v-if="endGame" class="end-game">
          <h1>Congratulations!</h1>
          <h2>Thank you for playing Journey of Life with us</h2>
          <div class="divider"></div>
          <p>Here are some statistics that you have managed to achieve during your life,
            as you faced challenge after challenge.
          </p>
          <div class="choices end-game-stats">
            <ul>
              <li>
                <p>Highest Score</p>
                <h2>3,430.00</h2>
              </li>
              <li>
                <p>Highest Net Worth</p>
                <h2>RM 7,000.00</h2>
              </li>
              <li>
                <p>Most Happy At</p>
                <h2>Age 35</h2>
              </li>
              <li>
                <p>Most Stressed At</p>
                <h2>Age 27</h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="!endGame" class="submission">
        <button v-if="showOutcome" class="glow-button" @click="onNextClick">Next</button>
        <button v-else class="glow-button" @click="onSubmitClick">Submit Answer</button>
      </div>
      <div v-else class="submission">
        <button class="glow-button" @click="onEndGameClick">Back to Home</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Scenario from "../components/Scenario.vue";
import CharacterStats from "../components/CharacterStats.vue";
import { getFirestore, onSnapshot, query, where, collection, doc, updateDoc, getDoc, Firestore } from "firebase/firestore";
import { Character } from "../classes/character/Character";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: { Scenario, CharacterStats },
  inject: ['userid', 'username'],
  data() {
    return {
      // Database
      db: null as Firestore,

      // [!] should display this character according to one obtained from user!
      // this gets passed in first before the existing character is loaded
      // if the ids are the same, it works because database access only needs character id
      // but calculations will only work on new charcter, not the database one
      // Can temporarily be fixed by getting character from database directly

      // character: new Character(this.userid, 18),
      character: null,

      // Page
      // character.currentpage: 1,

      submitted: false,
      showOutcome: false,

      endGame: false,
    }
  },
  methods: {
    onSubmitClick(event) {
      this.submitted = true;
    },
    enableShowOutcome() {
      this.showOutcome = true;
    },
    disableShowOutcome() {
      this.showOutcome = false;
    },
    onNextClick(event) {
      this.character.currentpage += 1;
      this.submitted = false;
      console.log("Current page is " + this.character.currentpage);
      // update firebase with new characterpage
      this.updateFirebaseCharacter(this.character.currentpage);
    },
    triggerEndGame() {
      // show the endgame page
      this.endGame = true;
    },
    onEndGameClick() {
      // navigate away from the endgame page
      this.$router.push({name: "Home"});
    },
    async updateFirebaseCharacter(pageid) {
      const docRef = doc(this.db, "character", `${this.character.id}`)
      await updateDoc(docRef, {
        currentpage: pageid,
      });
    }
  },
  created() {
    this.db = getFirestore();
  },
  beforeMount() {
    // Query characterid based on userid
    const characteridQuery = query(collection(this.db, "character"), where("userid", "==", `${this.userid}`));

    onSnapshot(characteridQuery, (characters) => {
      characters.forEach(character => {
        this.character = Object.assign(character.data(), Character);
      });
    });
  }
})
</script>

<style lang="scss">
@import "@/assets/scss/_global.scss";

.outer-container {
  padding-bottom: 50px;
}

.section.game {
  @include createGlass($opacity: 0.2);
  border-radius: 25px;
  padding: 75px;

  .submission {
    position: absolute;
    right: 10%;
    bottom: -20px;

    .glow-button {
      padding: 20px 30px;
    }
  }
}

.game-panel {
  display: grid;
  grid-template-columns: 1fr 2fr;
  // grid-template-rows: min-content 45px min-content;
  grid-template-areas: "character scenario";
  grid-gap: 20px 50px;

  h1 {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.15rem;
    margin-bottom: 1rem;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: rgba(white, 0.35);
    margin-bottom: 35px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 300;
  }

  @media only screen and (max-width: 1050px) {
    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 1.15rem;
      margin-bottom: 1.5rem;
    }

    h3 {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 0.95rem;
      margin-bottom: 0;
      line-height: 1.5;
    }
  }

  .character-stats {
    grid-area: character;

    .scores {
      display: grid;
      grid-template-columns: 3fr 5fr;
      margin: 35px 0;

      h3 {
        margin-bottom: 5px;
      }

      h1 {
        font-size: 2rem;
        margin-bottom: 0;
      }
    }

    @media only screen and (max-width: 1525px) {
      .scores {
        grid-template-columns: auto;
        grid-gap: 35px;
        h3 {
          font-size: 1rem;
        }
        h1 {
          font-size: 1.5rem;
        }
      }
    }

    .statistics {
      & > *:not(:last-child) {
        margin-bottom: 30px;
      }

      .stats-bar {
        margin-top: 10px;
        $borderradius: 50px;
        width: 100%;
        height: 25px;
        border-radius: $borderradius;
        display: block;
        @include createGlass($outlineopacity: 0.03);
        transition: all 0.2s ease;
        cursor: pointer;

        &:hover,
        &.active {
          @include createBoxShadow(25px, $yellow, 0.5);

          & > .inner-stats-bar {
            color: $dark;
          }
        }

        .inner-stats-bar {
          height: 100%;
          background: $yellow;
          @include createBoxShadow(30px, $yellow, 0.35);
          border-radius: $borderradius;
          font-weight: 600;
          font-size: 0.9rem;
          color: rgba($dark, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
      }
    }
  }

  .scenario-content, .end-game {
    .text {
      h2 {
        font-weight: 200;
      }
    }

    p {
      margin-bottom: 2rem;
    }
  }

  .mcq-alert {
    @include createGlass($yellow, 1, 25px, $yellow, 0.05);
    padding: 0 15px;
    border-radius: 10px;
    font-size: 0.9rem;
    color: $dark;
    font-weight: 600;
    align-items: center;
    display: flex;

    i {
      margin-right: 15px;
      font-size: 1.2rem;
    }
  }

  .choices {

    // [!] need to refactor
    &.end-game-stats {
      p {
        margin-bottom: 10px;
        color: white;
      }
      h2 {
        color: $yellow;
        margin-bottom: 0;
      }
    }

    ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 15px;

      li {
        h3,
        p {
          color: white;
          transition: color 0.2s ease;
          // line-height: 1.15;
        }

        h2 {
          color: $yellow;
          transition: color 0.2s ease;
        }

        p {
          color: $yellow;
          font-weight: 400;
        }

        &,
        & > * {
          cursor: pointer;
        }

        @include createGlass($opacity: 0.1, $outlineopacity: 0.03);
        @include createBoxShadow(30px, $dark, 0.35);
        padding: 30px;
        border-radius: 10px;
        transition: all 0.2s ease;

        &:hover,
        &.active {
          // mix-blend-mode: screen;
          @include createGlass($yellow, 1, 25px, $yellow, 0.05);

          h3, h2,
          p {
            color: $dark;
          }

          p {
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>