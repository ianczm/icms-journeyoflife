<template>
  <div class="nav-spacer" ref="nav-spacer"></div>
  <div class="outer-container">
    <div class="section admin">
      <div class="inner-container">
        <div id="character-database">
          <div class="text">
            <h1>Admin Panel</h1>
          </div>
          <h3 class="table-title">Character Database</h3>
          <div class="table-container">
            <table class="table existing">
              <tr class="character header">
                <!-- <th>username</th> -->
                <th>characterid</th>
                <!-- <th>userid</th> -->
                <th>currentpage</th>
                <th>age</th>
                <th>networth</th>
                <th>score</th>
                <th>happiness</th>
                <th>stress</th>
                <th>health</th>
                <th>security</th>
              </tr>
              <tr v-for="character in characters" :key="character.userid" class="character record">
                <!-- <td>{{ character.username }}</td> -->
                <td>{{ character.id }}</td>
                <!-- <td>{{ character.userid }}</td> -->
                <td>{{ character.currentpage }}</td>
                <td>{{ character.age }}</td>
                <td>{{ ('RM ' + character.networth.toLocaleString()) }}</td>
                <td>{{ character.score }}</td>
                <td>{{ character.happiness * 100 + '%' }}</td>
                <td>{{ character.stress * 100 + '%' }}</td>
                <td>{{ character.health * 100 + '%' }}</td>
                <td>{{ character.security * 100 + '%' }}</td>
              </tr>
            </table>
          </div>
          <div class="panel">
            <button @click="resetAllCharacters" class="glow-button">Reset Characters</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderBy, query, doc, setDoc, getFirestore, collection, onSnapshot } from "firebase/firestore"
import { Character, useridList } from "/src/classes/Character.js";

export default {
  data() {
    return {
      // Database
      db: null,
      colRef: null,
      characters: [],
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
          {...new Character(userid, characterid)}
          );
      }

      for (var i = 0; i < useridList.length; i++) {
        setDocs(this.db, i + 1, useridList[i]);
      }
    }
  },
  beforeMount() {
    var characterArray;
    const q = query(
      collection(this.db, "character"),
      orderBy("score", "desc"),
      // orderBy("networth", "desc")
    );
    this.colRef = onSnapshot(q, (characters) => {
      characterArray = [];
      characters.forEach((character) => {
        characterArray.push({ ...character.data() });
      })
      this.characters = characterArray;
    });
    console.log(this.characters);
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
    }
  }
  .panel {
    text-align: center;
    .glow-button {
      border: none;
      font-size: 0.85rem;
    }
  }
}
</style>