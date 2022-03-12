<template>
  <div class="nav-spacer" ref="nav-spacer"></div>
  <div class="outer-container">
    <div class="section agenda">
      <div class="inner-container">
        <div class="header">
          <h1>
            The<br>
            Agenda
          </h1>
        </div>
        <div class="agenda-container">
          <ul>
            <li v-for="agenda in agendas" :key="agenda.id" class="agenda"><AgendaItem :agenda="agenda" /></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AgendaItem from '../components/AgendaItem.vue'
import { getFirestore, collection, getDocs } from "firebase/firestore"

export default {
  components: {AgendaItem},
  data() {
    return {
      db: null,
      agendaCollection: null,
      agendas: []
    }
  },
  methods: {

  },
  created() {
    this.db = getFirestore();
  },
  async mounted() {
    this.agendaCollection = collection(this.db, "agenda");
    await getDocs(this.agendaCollection).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.agendas.push({...doc.data(), id: doc.id});
      });
    });
    console.log(this.agendas);
  },
}
</script>

<style lang="scss">
.section.agenda {
  width: calc(35vw + 450px);
  height: auto;
  margin: 0 auto;
  padding-bottom: 100px;

  .header {
    h1 {
      font-size: 4rem;
      margin-top: 15px;
      margin-bottom: 40px;
      text-align: center;
    }
  }

  .agenda-container {
    ul {
      list-style: none;
    }
  }
}

@media only screen and (max-width: 768px) {
  .section.agenda {
    width: 90vw;
  }
}
</style>