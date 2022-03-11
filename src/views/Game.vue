<template>
  <div class="nav-spacer"></div>
  <div class="outer-container">
    <div class="section game">
      <div class="character-stats">
        <h1>{{characterName}}</h1>
          <h2>Age {{characterAge}}</h2>
      </div>
      <div class="scenario-content">
        <div class="text">
          <h1>Scenario {{scenarioId}}</h1>
          <h2><strong>Phase {{phase}}</strong> — {{phaseTitle}}</h2>
          <div class="divider"></div>
          <p>{{phaseBody}}</p>
        </div>
      </div>
      <div class="choices">
        <ul>
          <li>
            <h3 @click="toggleChoice(e)">Choice Title</h3>
            <p>Choice Description</p>
          </li>
          <li>
            <h3>Choice Title</h3>
            <p>Choice Description</p>
          </li>
          <li>
            <h3>Choice Title</h3>
            <p>Choice Description</p>
          </li>
          <li>
            <h3>Choice Title</h3>
            <p>Choice Description</p>
          </li>
        </ul>
      </div>
      <div class="navigation">
        <!-- <router-link>Left</router-link>
        <router-link>Right</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Character Data
      characterName: 'Max Fosh',
      characterAge: 29,
      characterNetWorth: 5000,
      characterHappiness: 50,
      characterStress: 50,
      characterHealth: 50,
      characterSecurity: 50,

      // Scenario and Phases
      scenarioId: 1,
      phase: '1A',
      phaseTitle: 'Paying Tertiary Studies',
      phaseBody: 'Phase body',

      // Choices that the user can pick
      options: [],

      // Choices selected by user
      userSelection: [],
    }
  },
  methods: {
    toggleChoice(e) {
      e.target.classList.toggle('active');
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_global.scss';

.game {
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-template-rows: auto auto;
  grid-template-areas: 'character scenario' 'character choices';
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
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.075rem;
    margin-bottom: 0;
    line-height: 1.5;
  }

  // .character-stats {

  // }

  .scenario-content {

    .text {
      h2 {
        font-weight: 200;
      }
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
        h3, p {
          color: white;
          transition: color 0.2s ease;
        }

        cursor: pointer;

        @include createGlass($opacity: 0.1, $outlineopacity: 0.03);
        @include createBoxShadow(30px, $dark, 0.35);
        padding: 30px;
        border-radius: 10px;
        transition: all 0.2s ease;

        &:hover, &.active {
          // mix-blend-mode: screen;
          @include createGlass($yellow, 1, 25px, $yellow, 0.05);
          
          h3, p {
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