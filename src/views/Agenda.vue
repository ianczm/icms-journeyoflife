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
      </div>
    </div>
  </div>
</template>

<script>
import AgendaItem from '../components/AgendaItem.vue'

export default {
  components: {AgendaItem},
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
.agenda {
  height: 100vh;
}
</style>