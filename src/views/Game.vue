<template>
  <div class="nav-spacer"></div>
  <div class="outer-container">
    <div class="section game">
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
      <Scenario v-if="scenarioId" :id="scenarioId"/>
      <div class="navigation">
        <!-- <router-link>Left</router-link>
        <router-link>Right</router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
import Scenario from "../components/Scenario.vue";

export default {
  components: { Scenario },
  data() {
    return {
      // Character Data
      characterName: 'Max Fosh',
      characterAge: 29,
      finalScore: 27123,
      netWorth: 14345123,
      happiness: 0.9,
      stress: 0.5,
      health: 0.3,
      security: 0.2,

      // Page
      scenarioId: 1,
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_global.scss";

.outer-container {
  padding-bottom: 50px;
}

.section.game {
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-template-rows: auto auto auto;
  grid-template-areas: "character scenario" "character alert" "character choices";
  grid-gap: 50px;
  @include createGlass($opacity: 0.2);
  border-radius: 25px;
  padding: 75px;

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
    font-size: 1.075rem;
    margin-bottom: 0;
    line-height: 1.5;
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
        margin-bottom: 40px;
      }

      .stats-bar {
        margin-top: 5px;
        $borderradius: 50px;
        width: 100%;
        height: 30px;
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

  .scenario-content {
    .text {
      h2 {
        font-weight: 200;
      }
    }
  }

  .mcq-alert {
    @include createGlass($yellow, 1, 25px, $yellow, 0.05);
    padding: 15px;
    border-radius: 10px;
    font-size: 0.9rem;
    color: $dark;
    font-weight: 600;
    display: flex;
    align-items: center;

    i {
      margin-right: 15px;
      font-size: 1.2rem;
    }
  }

  .choices {
    grid-area: choices;
    ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      grid-gap: 15px;

      li {
        h3,
        p {
          color: white;
          transition: color 0.2s ease;
          // line-height: 1.15;
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

          h3,
          p {
            color: black;
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