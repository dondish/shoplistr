<template>
  <div>
    <v-row justify="center">
      <h1 class="primary--text display-3 font-weight-medium my-3">
        {{ name }}
      </h1>
    </v-row>
    <List />
  </div>
</template>

<script>
import Vue from 'vue'
import List from '@/components/List'

export default Vue.extend({
  components: {
    List
  },
  fetch () {
    // Fetch from database using the id
  },
  computed: {
    name () {
      return this.$store.state.list.name
    }
  }
})
</script>

<style>

</style>
